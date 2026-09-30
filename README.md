# IDN Homograph Attack Awareness Demo

**English** · [繁體中文](README.zh-TW.md)

A single-page, bilingual demo for showing coworkers how an IDN homograph attack hides a fake domain behind a familiar spelling.

**Project page:** https://teddashh.github.io/idn-homograph-example/

**Live demo:** https://project-9ogsa.vercel.app

The whole demo is one static `index.html` with a 中文 / English toggle, written in April 2026 as a SOC study note. It opens with a question (which of these two links is fake?), walks through a seven-step phishing kill chain based on [BBC reporting](https://www.bbc.com/news/articles/cly00jnnxypo) on Booking.com "reservation hijack" scams, explains why the Latin and Cyrillic letters look identical, and ends with a defense checklist.

## Preview locally

Open `index.html` in a browser, or serve the folder:

```bash
git clone https://github.com/teddashh/idn-homograph-example
cd idn-homograph-example
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy your own copy

For coworkers who want to rebuild this demo from the template. There is no build step: Vercel serves `index.html` as is, and `vercel.json` adds the response headers.

### Option A: Vercel CLI (about two minutes)

```bash
# install the CLI if you do not have it yet
npm install -g vercel

# from the project folder
cd idn-homograph-example
vercel
```

The first run asks a few setup questions; the defaults are fine. When it finishes you get a `https://<project>.vercel.app` URL. The first deployment of a new project always goes to production. After that, `vercel` creates a preview deployment and `vercel --prod` updates production.

### Option B: import from GitHub (for ongoing updates)

1. Push this folder to a GitHub repository.
2. Go to https://vercel.com/new
3. Import that repository.
4. Set Framework Preset to **Other** (it is a plain static site).
5. Leave Build Command and Output Directory empty.
6. Click Deploy. Later pushes to the production branch redeploy automatically.

### Option C: drag and drop (simplest, for a one-off)

1. Go to https://vercel.com/drop
2. Drag the project folder, or a `.zip` of it, onto the page.

## Files

```
idn-homograph-example/
├── index.html                  the demo (bilingual, all content and styles inline)
├── vercel.json                 Vercel settings (security headers, clean URLs)
├── site/                       project page for GitHub Pages, generated from site/page.json
├── .github/workflows/pages.yml deploys site/ to GitHub Pages
├── README.md                   this file
└── README.zh-TW.md             Traditional Chinese version
```

## How to present it

Suggested flow:

1. **Open the page and ask:** "Which of these two links is fake?" Most people cannot tell, or guess wrong.
2. **Have them click the second link.** The address bar shows an `xn--` Punycode name instead of the familiar spelling.
3. **Explain why:** the Cyrillic а (U+0430) and the Latin a (U+0061) look the same on screen but are different characters.
4. **Connect it to the Booking.com case:** this is how guests in the recent news were tricked.
5. **Close with defenses:** MFA, do not log in or pay from links in messages, and check the root domain at the right end of the address.

## Notes

- The fake link is not supposed to load. Expect a "site can't be reached" error or a browser warning. That is expected, not a bug.
- If the browser shows the `xn--` form even in the link text, its homograph protection is working. That is a good teaching point in itself.
- The page carries a `noindex, nofollow` robots meta tag, and `vercel.json` sends the same `X-Robots-Tag` header, so the deployment stays out of search results. `vercel.json` also sends `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and `Referrer-Policy: no-referrer`.
- The $2,000 and 580% figures in the kill chain are not in the linked BBC article. Check their sources before you quote them.

## Customize

- **Example domain:** the real and lookalike domains are hard-coded in several places: the page title, the header, both demo links (link text and `href`), the address-bar hint, the "Why can't you spot it?" explanation, the "How attackers weaponize it" list, the checklist, and the footer. Search `index.html` for the domain and replace every occurrence, then recompute the Punycode form. For example, `python3 -c 'print("exаmple.com".encode("idna"))'` (the `а` in that string is Cyrillic) prints `b'xn--exmple-4nf.com'`.
- **Logo:** replace the `<img>` inside the `.brand-mark` block. It currently loads the logo from an external URL.
- **More lookalike letters:** add rows to the `.char-table` block in the same format (a Latin cell, a Cyrillic cell, then the 一模一樣 / Identical cells).
- **Colors:** edit the CSS variables in `:root` at the top of `index.html`.
