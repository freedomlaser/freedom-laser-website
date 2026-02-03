# Freedom Laser — Static Site (GitHub Pages)

This repository is a **single-page**, **mobile-first** static website for **Freedom Laser**.

- ✅ No frameworks, bundlers, or build steps
- ✅ Three CSS themes (toggle in the header)
- ✅ Theme selection persists via `localStorage`
- ✅ Business-specific values are in **one place**: `js/config.js`

---

## Folder structure

```
/
  index.html
  README.md
  CNAME
  css/
    theme-card.css
    theme-zip-modern.css
    theme-ontario.css
  js/
    config.js
    theme.js
    main.js
  assets/
    business-card.png
    zip/
```

---

## Quick edit: phone, email, prices

Edit **only this file**:

- `js/config.js`

Update:
- `phoneDisplay`
- `phoneE164`
- `email`
- `prices.quitSmoking` (and optional `prices.appetiteSuppression`)

---

## Publish on GitHub Pages

1. Create a new repository on GitHub (example: `freedom-laser`).
2. Upload all files and folders from this project to the **root** of the repo.
3. Commit to the default branch (usually `main`).
4. In GitHub, go to **Settings → Pages**.
5. Under **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/ (root)`
6. Click **Save**.
7. Visit the URL shown in the Pages section once deployment completes.

Tip: if you update files, GitHub Pages redeploys automatically after you commit.

---

## Custom domain (with DNS records)

This repo includes a `CNAME` file with:

```
freedom-laser.ca
```

### 1) Set the custom domain in GitHub

1. Go to **Settings → Pages**.
2. In **Custom domain**, enter your domain (example: `freedom-laser.ca`).
3. Save.

GitHub will verify DNS. Once verified, you can enable HTTPS.

### 2) Add DNS records at your domain provider

#### Apex domain (root) — `freedom-laser.ca`
Create **A records** pointing to GitHub Pages:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Host/Name: `@` (or leave blank, depending on your provider)

#### WWW subdomain — `www.freedom-laser.ca`
Create a **CNAME record**:

- Host/Name: `www`
- Target: `YOUR-GITHUB-USERNAME.github.io`

(Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username.)

Optional: You can add a redirect at your DNS provider so `www` redirects to the apex (or vice versa).

### 3) HTTPS

After DNS propagates and GitHub verifies the domain:

- Go to **Settings → Pages**
- Enable **Enforce HTTPS**

DNS changes can take time to propagate. If verification fails initially, wait and try again.

---

## Notes

- All paths are **relative**, so the site works on GitHub Pages and on a local file server.
- Theme switching works by swapping a single stylesheet referenced by:
  ```html
  <link id="themeStylesheet" rel="stylesheet" href="css/theme-zip-modern.css">
  ```
- Config injection is handled by `js/main.js` (no repeated hardcoding of phone/email/prices in HTML).

