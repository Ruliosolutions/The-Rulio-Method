#!/usr/bin/env python3
"""
Generate Open Graph share card for Rulio (1200x630, Twitter/LinkedIn standard).
"""

from PIL import Image, ImageDraw, ImageFont
import os

OUT = "/workspace/rulio-launch/assets/rulio-og-card-1200x630.png"
os.makedirs(os.path.dirname(OUT), exist_ok=True)

# Create canvas with Rulio cosmic black background
W, H = 1200, 630
img = Image.new("RGB", (W, H), "#0c0c0e")
draw = ImageDraw.Draw(img)

# Subtle radial gradient overlay (top-left blue glow)
overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
odraw = ImageDraw.Draw(overlay)
for r in range(400, 0, -20):
    alpha = max(0, int(60 * (1 - r / 400)))
    odraw.ellipse([100 - r, 100 - r, 100 + r, 100 + r], fill=(91, 184, 255, alpha))
img.paste(overlay, (0, 0), overlay)

# Add a faceted R mark in the center-left (using a simple stylized version)
# We'll draw a stylized "R" using lines
def draw_r_mark(draw, x, y, size, color):
    """Draw a faceted 3D R mark."""
    # Vertical stroke
    draw.polygon([
        (x, y),
        (x + size*0.18, y + size*0.08),
        (x + size*0.18, y + size*0.92),
        (x, y + size),
    ], fill=color)
    # Top loop
    draw.polygon([
        (x, y),
        (x + size*0.55, y + size*0.15),
        (x + size*0.55, y + size*0.4),
        (x, y + size*0.5),
    ], fill=color)
    # Diagonal leg
    draw.polygon([
        (x + size*0.4, y + size*0.4),
        (x + size*0.55, y + size*0.4),
        (x + size*0.65, y + size),
        (x + size*0.5, y + size),
    ], fill=color)
    # Cyan glow accent on the diagonal
    draw.polygon([
        (x + size*0.4, y + size*0.4),
        (x + size*0.45, y + size*0.4),
        (x + size*0.55, y + size),
        (x + size*0.5, y + size),
    ], fill="#8FD1FF")

draw_r_mark(draw, 90, 130, 240, "#F4F1EA")

# Headline (large serif)
try:
    headline_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", 68)
    body_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", 36)
    small_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 22)
    brand_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24)
except Exception:
    headline_font = ImageFont.load_default()
    body_font = ImageFont.load_default()
    small_font = ImageFont.load_default()
    brand_font = ImageFont.load_default()

# Brand line (top)
draw.text((90, 60), "RULIO.STUDIO", fill="#5BB8FF", font=brand_font)

# Headline (right side, large)
draw.text((380, 170), "The 5-minute solfeggio", fill="#F4F1EA", font=headline_font)
draw.text((380, 250), "protocol.", fill="#F4F1EA", font=headline_font)

# Subhead
draw.text((380, 360), "Pick your worst hour.", fill="#a1a1aa", font=body_font)
draw.text((380, 405), "Match it to a frequency.", fill="#a1a1aa", font=body_font)
draw.text((380, 450), "Run it for 5 days.", fill="#a1a1aa", font=body_font)
draw.text((380, 495), "Notice.", fill="#5BB8FF", font=body_font)

# URL (bottom)
draw.text((90, 580), "rulio.app/shop", fill="#F4F1EA", font=brand_font)

# Disclaimer (small, bottom-right)
draw.text((820, 580), "Not a medical device.", fill="#a1a1aa", font=small_font)

img.save(OUT, "PNG", optimize=True)
print(f"Saved: {OUT}")
print(f"Size: {os.path.getsize(OUT) // 1024} KB")
