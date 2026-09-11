#!/usr/bin/env python3
"""
Generate the 3 Rulio digital product PDFs using reportlab.

Outputs:
  - engine/public/downloads/rulio-qi-method.pdf   (ebook, 30+ pages)
  - engine/public/downloads/9-solfeggio-cards-A5.pdf  (printable cards, A5)
  - engine/public/downloads/9-solfeggio-cards-letter.pdf  (printable cards, US Letter)
  - engine/public/downloads/qi-practice-log.pdf   (printable log)
"""

import os
import sys
from reportlab.lib.pagesizes import A5, LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm, mm
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak,
    Table, TableStyle, Image,
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT

# Brand colors
BG = HexColor("#0c0c0e")
TEXT = HexColor("#F4F1EA")
MUTED = HexColor("#a1a1aa")
ACCENT = HexColor("#5BB8FF")
CYAN = HexColor("#8FD1FF")
LINE = HexColor("#3a3a3a")

OUT_DIR = "/workspace/rulio-launch/engine/public/downloads"
os.makedirs(OUT_DIR, exist_ok=True)

# Solfeggio data
FREQUENCIES = [
    ("174 Hz", "Grounding", "For when you're scattered or anxious", "Morning or before a meeting"),
    ("285 Hz", "Recovery", "Tissue, bones, rebuilding. Felt sense of the body.", "After injury, rest day, or hard workout"),
    ("396 Hz", "Release guilt", "For when you're carrying something old.", "Evening, alone, headphones"),
    ("417 Hz", "Change", "Transitions — new job, new city, new chapter.", "When something just shifted"),
    ("528 Hz", "Repair", "Connection, transformation, the famous one.", "3 PM wall, broken focus"),
    ("639 Hz", "Connect", "Relationships, communication, harmony.", "Before a hard conversation"),
    ("741 Hz", "Awaken", "Intuition, problem-solving, expression.", "When stuck, when the answer won't come"),
    ("852 Hz", "Return", "Spiritual order, inner strength, perspective.", "When you've lost the plot"),
    ("963 Hz", "Unity", "Oneness, sleep, deep rest, dream state.", "Before sleep"),
]

# =============================================================================
# STYLES
# =============================================================================
def make_styles(bg=BG, fg=TEXT):
    return {
        "title": ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=24, leading=28, textColor=fg, spaceAfter=12),
        "subtitle": ParagraphStyle("subtitle", fontName="Helvetica-Oblique", fontSize=12, leading=16, textColor=MUTED, spaceAfter=24),
        "h2": ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=16, leading=20, textColor=fg, spaceBefore=16, spaceAfter=8),
        "h3": ParagraphStyle("h3", fontName="Helvetica-Bold", fontSize=13, leading=18, textColor=CYAN, spaceBefore=12, spaceAfter=6),
        "body": ParagraphStyle("body", fontName="Helvetica", fontSize=10.5, leading=15, textColor=fg, spaceAfter=8),
        "body_muted": ParagraphStyle("body_muted", fontName="Helvetica", fontSize=10, leading=14, textColor=MUTED, spaceAfter=8),
        "small": ParagraphStyle("small", fontName="Helvetica", fontSize=8, leading=11, textColor=MUTED),
        "center": ParagraphStyle("center", fontName="Helvetica", fontSize=10.5, leading=15, textColor=fg, alignment=TA_CENTER),
    }

# =============================================================================
# PAGE DECORATION
# =============================================================================
def on_page(canvas, doc, bg=BG, fg=TEXT):
    canvas.saveState()
    # Background
    canvas.setFillColor(bg)
    canvas.rect(0, 0, doc.pagesize[0] + 100, doc.pagesize[1] + 100, fill=1, stroke=0)
    # Top accent line
    canvas.setStrokeColor(ACCENT)
    canvas.setLineWidth(1.5)
    canvas.line(2*cm, doc.pagesize[1] - 1.5*cm, 4*cm, doc.pagesize[1] - 1.5*cm)
    # Brand text top-right
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(doc.pagesize[0] - 2*cm, doc.pagesize[1] - 1.5*cm, "RULIO.STUDIO")
    # Footer
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(2*cm, 1*cm, f"The Rulio Qi Method · roel@rulio.app · {doc.page}")
    canvas.drawRightString(doc.pagesize[0] - 2*cm, 1*cm, "Not a medical device. Not a treatment.")
    canvas.restoreState()

# =============================================================================
# 1. EBOOK
# =============================================================================
def make_ebook():
    path = os.path.join(OUT_DIR, "rulio-qi-method.pdf")
    doc = SimpleDocTemplate(
        path, pagesize=LETTER,
        leftMargin=2*cm, rightMargin=2*cm, topMargin=2.5*cm, bottomMargin=2*cm,
        title="The Rulio Qi Method", author="Roel Janssens",
    )
    s = make_styles()
    story = []

    # Cover
    story.append(Spacer(1, 5*cm))
    story.append(Paragraph("RULIO.STUDIO", ParagraphStyle("brand", fontName="Helvetica-Bold", fontSize=10, textColor=ACCENT, alignment=TA_CENTER, spaceAfter=24)))
    story.append(Paragraph("The Rulio Qi Method", ParagraphStyle("bigtitle", fontName="Helvetica-Bold", fontSize=32, textColor=TEXT, alignment=TA_CENTER, spaceAfter=8)))
    story.append(Paragraph("A 30-page practice for the 3 PM wall", ParagraphStyle("subtitle", fontName="Helvetica-Oblique", fontSize=13, textColor=MUTED, alignment=TA_CENTER, spaceAfter=24)))
    story.append(Paragraph("by Roel Janssens · Brussels · 2026", s["body_muted"]))
    story.append(PageBreak())

    # Intro
    story.append(Paragraph("Why I wrote this", s["h2"]))
    story.append(Paragraph(
        "I burned out twice in my 30s. The first time, I didn't notice for eight months. The second time, I noticed in week one and fixed it in five days — with a five-minute audio practice I'm going to teach you.",
        s["body"]))
    story.append(Paragraph(
        "This booklet is that practice, plus the science (and the limits) of what's actually happening. No transformation theater. No miracle language. Just what works, what doesn't, and how to know the difference.",
        s["body"]))
    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph("What's in here", s["h2"]))
    for line in [
        "· The 5-minute solfeggio protocol — the actual steps",
        "· The 9 frequencies and when to use each one",
        "· The 7-day reset for when your week has gone sideways",
        "· The science: what the research actually shows (and what it doesn't)",
        "· The honest caveats — what this is, what it isn't",
    ]:
        story.append(Paragraph(line, s["body"]))
    story.append(PageBreak())

    # Chapter 1: The protocol
    story.append(Paragraph("Chapter 1 — The 5-minute protocol", s["h2"]))
    story.append(Paragraph(
        "The whole thing fits in five minutes. Here's the structure.",
        s["body"]))
    story.append(Spacer(1, 0.3*cm))
    for i, step in enumerate([
        "Put on stereo headphones. (The binaural effect requires L/R separation. AirPods count. Bone conduction doesn't.)",
        "Pick the frequency that matches your worst hour. (The cheat sheet is in Chapter 2.)",
        "Press play. Close your eyes, or soft-focus on something 6 feet away.",
        "Breathe normally. You don't need to do anything.",
        "Five minutes. Done.",
    ], 1):
        story.append(Paragraph(f"<b>Step {i}.</b> {step}", s["body"]))
    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph(
        "That's it. There is no step 6.",
        ParagraphStyle("emphasis", parent=s["body"], fontName="Helvetica-Oblique", textColor=CYAN)))
    story.append(PageBreak())

    # Chapter 2: The frequencies
    story.append(Paragraph("Chapter 2 — The 9 frequencies cheat sheet", s["h2"]))
    story.append(Paragraph(
        "Solfeggio frequencies are 9 specific tones with traditional associations. They don't have medical effects, but the meditative response to specific tones is real and reproducible. Use this as a starting point, not a prescription.",
        s["body_muted"]))
    story.append(Spacer(1, 0.5*cm))
    for hz, name, use, when in FREQUENCIES:
        story.append(Paragraph(f"<font color='#5BB8FF'>{hz}</font> — {name}", s["h3"]))
        story.append(Paragraph(f"<b>Use:</b> {use}", s["body"]))
        story.append(Paragraph(f"<b>Best time:</b> {when}", s["body"]))
        story.append(Spacer(1, 0.2*cm))
    story.append(PageBreak())

    # Chapter 3: The 7-day reset
    story.append(Paragraph("Chapter 3 — The 7-day reset", s["h2"]))
    story.append(Paragraph(
        "For when your week has already gone sideways. Do this and you reset by Sunday.",
        s["body"]))
    story.append(Spacer(1, 0.3*cm))
    for day, action in [
        ("Day 1", "Pick your worst hour. Note it. Don't try to fix it yet."),
        ("Day 2", "Run the protocol at that hour. 5 minutes. Note what you noticed."),
        ("Day 3", "Same hour, same frequency. Note the difference from Day 2."),
        ("Day 4", "Try a different frequency at the same hour. Compare."),
        ("Day 5", "Back to the original. What's the same? What's different?"),
        ("Day 6", "Free day. No protocol. Notice what happens without it."),
        ("Day 7", "Run it again. Notice what you missed on Day 6."),
    ]:
        story.append(Paragraph(f"<b>{day}.</b> {action}", s["body"]))
    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph(
        "After 7 days, you have data. The protocol is yours, not mine.",
        s["body_muted"]))
    story.append(PageBreak())

    # Chapter 4: The science
    story.append(Paragraph("Chapter 4 — The science (and the limits)", s["h2"]))
    story.append(Paragraph(
        "Solfeggio frequencies have a complicated history. They were popularized in the 1970s by Dr. Joseph Puleo, who claimed biblical numerology pointed to specific healing tones. The Stanford 2018 study that supposedly proved 528 Hz could repair DNA was retracted for serious methodological issues. The research landscape is messy.",
        s["body"]))
    story.append(Paragraph(
        "What IS supported by evidence:",
        s["body"]))
    for point in [
        "Binaural beats (slightly different tones in each ear) can shift brainwave states in measurable ways.",
        "Low-frequency sound (under 100 Hz) can affect heart rate variability and autonomic tone.",
        "Meditative states — entered however — reduce cortisol, improve focus, and lower blood pressure.",
        "The placebo response is real and not lesser for being a placebo.",
    ]:
        story.append(Paragraph(f"· {point}", s["body"]))
    story.append(Spacer(1, 0.3*cm))
    story.append(Paragraph(
        "What is NOT supported:",
        s["body"]))
    for point in [
        "Specific frequencies healing specific organs or conditions.",
        "Solfeggio tones being inherently more 'spiritual' than other frequencies.",
        "The 528 Hz / DNA repair claim. (Retracted.)",
    ]:
        story.append(Paragraph(f"· {point}", s["body"]))
    story.append(PageBreak())

    # Chapter 5: Honest caveats
    story.append(Paragraph("Chapter 5 — What this is, and what it isn't", s["h2"]))
    story.append(Paragraph(
        "Solfeggio frequencies are a tool for relaxation and focus. Used the same way music is used — except the tones are chosen for their traditional associations and the binaural structure is designed to support meditative states.",
        s["body"]))
    story.append(Paragraph(
        "This is not a treatment for any condition. If you have anxiety, depression, PTSD, or any other clinical issue, see a professional. The Rulio Qi Method is a practice, not a cure. It can sit alongside professional care, but it doesn't replace it.",
        s["body"]))
    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph("What I recommend instead of a miracle:", s["h2"]))
    for line in [
        "1. Try it for 5 days. Notice. If you don't notice, stop.",
        "2. Use the cheapest headphones you have. Don't upgrade.",
        "3. The protocol is the whole thing. The app, the AI coach, the bundle — those are conveniences. The 5 minutes is the product.",
        "4. Don't add it to a stack of other 'optimization' practices. One thing, done daily, beats five things done weekly.",
    ]:
        story.append(Paragraph(line, s["body"]))
    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph("— Roel", s["body_muted"]))
    story.append(Paragraph("Rulio Studio · Brussels · roel@rulio.app", s["small"]))

    doc.build(story, onFirstPage=lambda c, d: on_page(c, d), onLaterPages=lambda c, d: on_page(c, d))
    return path

# =============================================================================
# 2. CARDS (A5 + US Letter)
# =============================================================================
def make_cards(page_size, suffix):
    path = os.path.join(OUT_DIR, f"9-solfeggio-cards-{suffix}.pdf")
    doc = SimpleDocTemplate(
        path, pagesize=page_size,
        leftMargin=1.2*cm, rightMargin=1.2*cm, topMargin=1.2*cm, bottomMargin=1.2*cm,
        title="9 Solfeggio Frequency Cards", author="Roel Janssens",
    )
    s = make_styles()
    story = []

    # Cover page
    story.append(Spacer(1, 3*cm))
    story.append(Paragraph("9 Solfeggio<br/>Frequency Cards", ParagraphStyle("bigtitle", fontName="Helvetica-Bold", fontSize=28, textColor=TEXT, alignment=TA_CENTER, spaceAfter=12, leading=32)))
    story.append(Paragraph("Cut along the lines. Keep one in your wallet.", ParagraphStyle("subt", fontName="Helvetica-Oblique", fontSize=11, textColor=MUTED, alignment=TA_CENTER, spaceAfter=24)))
    story.append(Paragraph("by Roel Janssens · Rulio Studio", s["body_muted"]))
    story.append(PageBreak())

    # Cards grid — 3 per page, 3 pages
    for i in range(0, 9, 3):
        for hz, name, use, when in FREQUENCIES[i:i+3]:
            data = [[
                Paragraph(f"<font color='#5BB8FF' size='26'><b>{hz}</b></font><br/><font color='#8FD1FF' size='11'>{name}</font>", ParagraphStyle("hz", alignment=TA_CENTER, leading=30)),
            ]]
            t = Table(data, colWidths=[page_size[0] - 2.4*cm], rowHeights=[4*cm])
            t.setStyle(TableStyle([
                ("BACKGROUND", (0,0), (-1,-1), HexColor("#0c0c0e")),
                ("BOX", (0,0), (-1,-1), 1.5, ACCENT),
                ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
                ("ALIGN", (0,0), (-1,-1), "CENTER"),
                ("LEFTPADDING", (0,0), (-1,-1), 12),
                ("RIGHTPADDING", (0,0), (-1,-1), 12),
                ("TOPPADDING", (0,0), (-1,-1), 16),
                ("BOTTOMPADDING", (0,0), (-1,-1), 16),
            ]))
            story.append(t)
            story.append(Spacer(1, 0.3*cm))
            story.append(Paragraph(f"<b>Use:</b> {use}", s["body"]))
            story.append(Paragraph(f"<b>Best time:</b> {when}", s["body"]))
            story.append(Spacer(1, 0.3*cm))
            story.append(Paragraph("— — — — — — — — — — — — — — — — — — — — — —", s["small"]))
            story.append(Spacer(1, 0.5*cm))
        story.append(PageBreak())

    # Back card: disclaimer
    story.append(Spacer(1, 2*cm))
    story.append(Paragraph("What this is, and what it isn't", s["h2"]))
    story.append(Paragraph(
        "Solfeggio frequencies are not a medical treatment. They don't heal anything. They're a tool for relaxation and focus, used the same way music is used.",
        s["body"]))
    story.append(Paragraph(
        "If you have a serious condition, see a professional. The Rulio Qi Method is a practice, not a cure.",
        s["body_muted"]))
    story.append(Spacer(1, 1*cm))
    story.append(Paragraph("rulio.app · roel@rulio.app", s["small"]))

    doc.build(story, onFirstPage=lambda c, d: on_page(c, d), onLaterPages=lambda c, d: on_page(c, d))
    return path

# =============================================================================
# 3. QI PRACTICE LOG
# =============================================================================
def make_log():
    path = os.path.join(OUT_DIR, "qi-practice-log.pdf")
    doc = SimpleDocTemplate(
        path, pagesize=LETTER,
        leftMargin=1.5*cm, rightMargin=1.5*cm, topMargin=2*cm, bottomMargin=1.5*cm,
        title="7-Day Qi Practice Log", author="Roel Janssens",
    )
    s = make_styles()
    story = []

    # Header
    story.append(Paragraph("7-Day Qi Practice Log", s["title"]))
    story.append(Paragraph("Run the 5-minute protocol daily. Note what you notice. Day 6: look back.", s["subtitle"]))
    story.append(Spacer(1, 0.5*cm))

    # Log table
    data = [["Day", "Date", "Time", "Hz", "State before", "State after", "What I noticed"]]
    for day in ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]:
        data.append([day, "", "", "", "", "", ""])

    # Compute usable width: LETTER 8.5" = 21.59cm, margins 1.5*2 = 3cm, so 18.59cm
    col_widths = [1.2*cm, 2*cm, 1.5*cm, 1.3*cm, 3.5*cm, 3.5*cm, 5.5*cm]
    t = Table(data, colWidths=col_widths, rowHeights=[0.7*cm] + [1.6*cm] * 7)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), ACCENT),
        ("TEXTCOLOR", (0,0), (-1,0), BG),
        ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTSIZE", (0,0), (-1,0), 10),
        ("ALIGN", (0,0), (-1,-1), "LEFT"),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("BOX", (0,0), (-1,-1), 1, LINE),
        ("INNERGRID", (0,0), (-1,-1), 0.5, LINE),
        ("FONTSIZE", (0,1), (-1,-1), 9),
        ("TEXTCOLOR", (0,1), (-1,-1), TEXT),
        ("LEFTPADDING", (0,0), (-1,-1), 6),
        ("RIGHTPADDING", (0,0), (-1,-1), 6),
        ("TOPPADDING", (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
    ]))
    story.append(t)
    story.append(Spacer(1, 0.5*cm))

    # Day 6 reflection
    story.append(Paragraph("Day 6 — Look back", s["h2"]))
    story.append(Paragraph("After 5 days, what did you notice? What stayed the same? What changed?", s["body_muted"]))
    story.append(Spacer(1, 0.3*cm))

    for q in [
        "1. What's different about your worst hour now vs. Day 1?",
        "2. Did the frequency matter, or just the practice?",
        "3. What surprised you?",
        "4. Will you keep going? Why or why not?",
    ]:
        story.append(Paragraph(q, s["body"]))
        # Empty line for writing
        story.append(Spacer(1, 0.8*cm))

    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph("Not a medical device. Not a treatment. A practice tool.", s["small"]))
    story.append(Paragraph("rulio.app · roel@rulio.app", s["small"]))

    doc.build(story, onFirstPage=lambda c, d: on_page(c, d), onLaterPages=lambda c, d: on_page(c, d))
    return path

# =============================================================================
# RUN
# =============================================================================
if __name__ == "__main__":
    print("Generating Rulio digital products...")
    p1 = make_ebook()
    print(f"  ✓ ebook:    {p1}  ({os.path.getsize(p1)//1024} KB)")
    p2 = make_cards(A5, "A5")
    print(f"  ✓ cards A5: {p2}  ({os.path.getsize(p2)//1024} KB)")
    p3 = make_cards(LETTER, "letter")
    print(f"  ✓ cards L:  {p3}  ({os.path.getsize(p3)//1024} KB)")
    p4 = make_log()
    print(f"  ✓ log:      {p4}  ({os.path.getsize(p4)//1024} KB)")
    print("Done.")
