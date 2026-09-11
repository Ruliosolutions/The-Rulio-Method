# Rulio email signature — HTML + plain text

> **Drop into Apple Mail, Gmail web, or Outlook.** The signature
> uses the R mark (40×40) inline, plus the standard name + role
> + URL + email + RULIO.STUDIO mark. Brand-guardian approved.

## HTML signature (paste into Apple Mail > Preferences > Signatures)

```html
<div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; line-height: 1.5; color: #f4f1ea; background: transparent;">
  <table cellpadding="0" cellspacing="0" border="0" style="margin: 0; padding: 0;">
    <tr>
      <td style="padding-right: 14px; vertical-align: top;">
        <img src="cid:rulio-app-icon-1024.png" alt="R" width="40" height="40" style="display: block; border-radius: 6px;" />
      </td>
      <td style="vertical-align: top; border-left: 1px solid rgba(244, 241, 234, 0.18); padding-left: 14px;">
        <div style="font-weight: 600; color: #f4f1ea;">Roel Janssens</div>
        <div style="font-size: 13px; color: #a1a1aa;">Founder, Rulio Studio</div>
        <div style="font-size: 12px; color: #a1a1aa; margin-top: 6px; font-family: 'JetBrains Mono', 'Menlo', monospace;">
          rulio.io · hello@rulio.io
        </div>
      </td>
    </tr>
  </table>
</div>
```

## Plain-text signature (for plain-text email clients)

```
—
Roel Janssens
Founder, Rulio Studio

rulio.io · hello@rulio.io
```

## How to set it up

### Apple Mail

1. **Mail → Settings → Signatures → +** (new signature).
2. Name it "Rulio".
3. Uncheck "Always match my default message font".
4. Paste the HTML signature.
5. To embed the R icon, drag `rulio-app-icon-1024.png` from
   `assets/` into the signature editor. Apple Mail will store
   it as an inline attachment.
6. Set this signature as default for `hello@rulio.io`.

### Gmail web

1. **Settings → See all settings → General → Signature.**
2. Paste the HTML signature in the editor.
3. To embed the R icon: Gmail signatures don't support inline
   images via HTML paste. Workarounds:
   - Upload the R to a public URL (e.g., `rulio.io/sig.png`),
     then reference it: `<img src="https://rulio.io/sig.png" ...>`.
   - Or set up a "Send mail as" custom signature via a
     transactional email service.
4. Save.

### Outlook

1. **File → Options → Mail → Signatures → New.**
2. Paste the HTML.
3. To embed the R: insert as an image, set size to 40×40,
   align top.

## The signature on dark vs light backgrounds

The signature is designed for dark backgrounds. On a light
email client, the text will be hard to read. If the prospect's
email client forces light mode (most do for outgoing), add an
inline white-background panel:

```html
<div style="background: #0c0c0e; padding: 12px 14px; border-radius: 8px; display: inline-block;">
  <!-- the rest of the signature here -->
</div>
```

This works in most modern email clients. Older clients
(Outlook 2010, Lotus Notes) will fall back gracefully.

## Brand-guardian red lines

- The R must be the brand mark, not a generic avatar or
  placeholder image.
- The signature must use the system typefaces (Inter for body,
  JetBrains Mono for the URL/email line).
- The RULIO.STUDIO mark is optional at the bottom of the
  signature; do not add a separate "5D Masters" reference
  anywhere.
- The signature is the highest-trust surface (it gets copied
  into every reply). The R + the name + the URL is the
  minimum. Anything more is decoration.
