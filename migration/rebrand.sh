#!/usr/bin/env bash
#
# Rulio rebrand — mechanical sweep.
#
# Replaces every "5D" string in the canonical portfolio's HTML files
# with the Rulio equivalent, per the Section 3 naming rules. Run this
# after `content-publisher` drafts the new copy and `brand-guardian`
# approves the redlines.
#
# Usage:
#   ./rebrand.sh path/to/portfolio/
#
# Idempotent — re-runs are safe. Always does a dry-run first.

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "usage: $0 <portfolio-root>"
  echo "  e.g. $0 /workspace/roeljanssens-portfolio/"
  exit 1
fi

ROOT="$1"
TS=$(date +%Y%m%d-%H%M%S)
LOG="rebrand-${TS}.log"

if [[ ! -d "$ROOT" ]]; then
  echo "error: $ROOT is not a directory"
  exit 1
fi

echo "==[ rulio rebrand sweep ]=================================="
echo "  root:   $ROOT"
echo "  log:    $LOG"
echo "  time:   $(date -Iseconds)"
echo ""

# --- Step 1. Pre-flight: confirm the source is a portfolio --------
if [[ ! -f "$ROOT/index.html" && ! -f "$ROOT/index.htm" ]]; then
  echo "warning: $ROOT has no index.html — proceeding anyway"
fi

# --- Step 2. Snapshot the current state ----------------------------
SNAPSHOT_DIR="${ROOT}/.rebrand-snapshot-${TS}"
mkdir -p "$SNAPSHOT_DIR"
echo "[1/4] snapshot to $SNAPSHOT_DIR"
rsync -a --quiet "$ROOT/" "$SNAPSHOT_DIR/" \
  --exclude=".rebrand-snapshot-*" --exclude="node_modules" --exclude=".git"
echo "      $(find "$SNAPSHOT_DIR" -type f | wc -l) files snapshotted"
echo ""

# --- Step 3. Dry-run scan ------------------------------------------
echo "[2/4] dry-run: scanning for 5D strings"
echo ""

# Find all the files that contain a 5D string. We exclude:
#   - the snapshot we just made
#   - node_modules / .git
#   - the legacy/ subfolder (allowed exception list)
#   - markdown files (these are strategic docs, not public surfaces)

mapfile -t MATCHED_FILES < <(
  grep -rl --exclude-dir=node_modules \
           --exclude-dir=.git \
           --exclude-dir=.rebrand-snapshot-* \
           --exclude-dir=legacy \
           --exclude='*.md' \
           -E '(5D|5d Masters|5DEnerQi|Qi5D|5DEnerQi|elevateyourbrand@5dmasters|5dmasters\.com)' \
           "$ROOT" 2>/dev/null || true
)

if [[ ${#MATCHED_FILES[@]} -eq 0 ]]; then
  echo "      no 5D strings found. portfolio is already clean."
  echo "      (if you expected matches, check the exclude filters above)"
  exit 0
fi

echo "      found ${#MATCHED_FILES[@]} files with 5D strings:"
for f in "${MATCHED_FILES[@]}"; do
  count=$(grep -cE '(5D|5d Masters|5DEnerQi|Qi5D|elevateyourbrand@5dmasters|5dmasters\.com)' "$f" 2>/dev/null || echo "0")
  printf "        %-60s %s matches\n" "${f#$ROOT/}" "$count"
done
echo ""

# --- Step 4. Confirm before applying -------------------------------
echo "[3/4] replacement plan (case-insensitive, applied as-is):"
cat <<'EOF'
  elevateyourbrand@5dmasters.com  ->  hello@rulio.io
  5D Masters                       ->  Rulio Studio
  5D Masters · RULIO               ->  RULIO
  5D EnerQi                        ->  Rulio EnerQi
  5DEnerQi                         ->  Rulio EnerQi
  5D Philosophy                    ->  RULIO code
  5D framework                     ->  RULIO framework
  5D Masters ecosystem             ->  Rulio studio
  5D EnerQi flow                   ->  Rulio EnerQi flow
  5dmasters.com                    ->  rulio.io/studio
  qi5d.eu                          ->  rulio.io/qi
  enerqimasters.com                ->  rulio.io/enerqi
  Full brand elevation (5D)        ->  Full brand elevation (RULIO method)
  The 5D code                      ->  The RULIO code
  5D Healing Pack                  ->  Rulio EnerQi Healing Pack
  5D EnerQi Wellness Banner        ->  Rulio EnerQi Wellness Banner
  5D Enerqi Wellness Banner        ->  Rulio EnerQi Wellness Banner
  Qi5D Ebook Funnel                ->  Rulio Qi Ebook Funnel
  Qi5D                             ->  Rulio Qi
EOF
echo ""
read -r -p "      apply these replacements? (yes/no) " ANSWER
if [[ "$ANSWER" != "yes" ]]; then
  echo "      aborted by user. snapshot preserved at $SNAPSHOT_DIR"
  exit 1
fi
echo ""

# --- Step 5. Apply the replacements --------------------------------
echo "[4/4] applying replacements"
for f in "${MATCHED_FILES[@]}"; do
  sed -i \
    -e 's|elevateyourbrand@5dmasters\.com|hello@rulio.io|g' \
    -e 's|5D Masters · RULIO|RULIO|g' \
    -e 's|5D Masters|Rulio Studio|g' \
    -e 's|5DEnerQi|Rulio EnerQi|g' \
    -e 's|5D EnerQi|Rulio EnerQi|g' \
    -e 's|5D Enerqi|Rulio EnerQi|g' \
    -e 's|5D Philosophy|RULIO code|g' \
    -e 's|5D framework|RULIO framework|g' \
    -e 's|5D code|RULIO code|g' \
    -e 's|5D Healing Pack|Rulio EnerQi Healing Pack|g' \
    -e 's|5D EnerQi Wellness Banner|Rulio EnerQi Wellness Banner|g' \
    -e 's|5D Enerqi Wellness Banner|Rulio EnerQi Wellness Banner|g' \
    -e 's|5D Masters ecosystem|Rulio studio|g' \
    -e 's|5D EnerQi flow|Rulio EnerQi flow|g' \
    -e 's|5dmasters\.com|rulio.io/studio|g' \
    -e 's|qi5d\.eu|rulio.io/qi|g' \
    -e 's|enerqimasters\.com|rulio.io/enerqi|g' \
    -e 's|Full brand elevation (5D)|Full brand elevation (RULIO method)|g' \
    -e 's|Qi5D Ebook Funnel|Rulio Qi Ebook Funnel|g' \
    -e 's|Qi5D|Rulio Qi|g' \
    "$f"
done
echo "      applied to ${#MATCHED_FILES[@]} files"
echo ""

# --- Step 6. Post-sweep verify ------------------------------------
REMAINING=$(grep -rE '(5D|5d Masters|5DEnerQi|Qi5D|elevateyourbrand@5dmasters|5dmasters\.com)' \
  --exclude-dir=node_modules \
  --exclude-dir=.git \
  --exclude-dir=.rebrand-snapshot-* \
  --exclude-dir=legacy \
  --exclude='*.md' \
  "$ROOT" 2>/dev/null | wc -l || echo 0)

if [[ "$REMAINING" -gt 0 ]]; then
  echo "WARNING: $REMAINING 5D strings remain after the sweep."
  echo "         these are likely in the exception list (legacy/, alt text, file names) or in patterns the script didn't cover."
  echo "         run the daily drift-watch cron to surface them."
  echo ""
  grep -rEn '(5D|5d Masters|5DEnerQi|Qi5D|elevateyourbrand@5dmasters|5dmasters\.com)' \
    --exclude-dir=node_modules \
    --exclude-dir=.git \
    --exclude-dir=.rebrand-snapshot-* \
    --exclude-dir=legacy \
    --exclude='*.md' \
    "$ROOT" 2>/dev/null | head -20
else
  echo "verified: zero 5D strings remain in the non-exception surfaces."
fi
echo ""

# --- Step 7. Log --------------------------------------------------
{
  echo "rulio rebrand sweep — $TS"
  echo "  root: $ROOT"
  echo "  files modified: ${#MATCHED_FILES[@]}"
  echo "  remaining 5D strings: $REMAINING"
  echo "  snapshot: $SNAPSHOT_DIR"
  echo ""
  echo "  files touched:"
  for f in "${MATCHED_FILES[@]}"; do
    echo "    - ${f#$ROOT/}"
  done
} > "$LOG"

echo "==[ done ]==================================================="
echo "  log written to: $LOG"
echo "  snapshot at:    $SNAPSHOT_DIR"
echo "  next:           hand off to brand-guardian for the redline review"
echo "                   then deploy (and test the 301s on 5dmasters.com)"
