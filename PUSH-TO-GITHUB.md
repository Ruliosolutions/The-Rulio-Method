# Push Rulio to GitHub — manual upload instructions

You asked for **Option B** (zip + manual upload). Here's exactly what to do.

## What's in the zip

- All Rulio source code (engine, ebook, dist-*, launch-kit, scripts)
- Git history already initialized (1 commit, branch `main`)
- `.gitignore` excluding `node_modules/`, `.next/`, MP3s, deploy metadata
- 182 files, ~5 MB compressed

Excluded (regenerate locally):
- `engine/node_modules/` — run `npm install`
- `engine/.next/` — run `npm run build`
- `qi-sessions/audio/*.mp3` — run `python3 qi-sessions/generate.py`
- `engine/public/downloads/*.pdf` — run `python3 scripts/generate-digital-products.py`

## Step-by-step

```bash
# 1. Extract the zip somewhere (e.g. ~/rulio-launch)
unzip rulio-launch.zip -d ~/rulio-launch
cd ~/rulio-launch

# 2. Create a new empty repo on GitHub
#    Go to https://github.com/new
#    - Name: rulio-launch (or whatever you want)
#    - Private or Public (your call)
#    - DO NOT check "Initialize with README" / .gitignore / license
#    Click "Create repository"

# 3. Add GitHub as the remote + push
git remote add origin https://github.com/YOUR_USERNAME/rulio-launch.git
git push -u origin main

# 4. (Optional) regenerate excluded files
cd engine && npm install && cd ..
python3 scripts/generate-digital-products.py
python3 qi-sessions/generate.py     # if you have the audio source
```

## What's committed

```
.gitignore
LAUNCH.md
MONETIZATION_REVIEW.md
PUBLISH-30-DAY-PLAN.md
README.md                       ← project overview
SUPABASE_SETUP.md
WALKTHROUGH.md
assets/                         ← brand
deploy-fly.sh
deploy-vercel.sh
deploy.sh
dist-affiliate/                 ← static deploys
dist-ai-coach/
dist-booking/
dist-funnel/
dist-landing/
dist-partnership/
dist-press-kit/
dist-ruliosolutions/
dist-shop/
dist-workshop/
dm-outreach/
ebook/                          ← "The Rulio Qi Method"
engine/                         ← Next.js app (without node_modules/.next)
final-report.md
fly.toml
funnel/
landing-page/
launch-kit/                     ← 9 content deliverables
migration/
scripts/
sections/
setup-all.sh
setup-interactive.sh
setup.sh
vercel.json
workshop/
```

If you want to add GitHub Actions for CI or auto-deploy, let me know — I'll add the workflow files.

— Rulio · Brussels · 2026
