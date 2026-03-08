# Nightfall Vault

Nightfall Vault is an original entertainment app concept inspired by curated horror/thriller streaming services.

## Tech stack

- React 18
- TypeScript
- Vite
- CSS

## What it includes

- Hero section with clear value proposition and free-trial CTA
- Dynamic featured picks with a shuffle interaction
- Membership and subscription policy details
- Originals showcase row
- Modern dark UI

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite (default: `http://localhost:5173`).

## Static hosting compatibility

The Vite build uses `base: './'`, which makes generated asset paths relative. This allows the same `dist/` output to work when deployed:

- to **GitHub Pages** project sites (for example `https://<user>.github.io/HorrorStream/`)
- to **cPanel hosts**, including installs under a subdirectory such as `public_html/horrorstream/`

Build output:

```bash
npm run build
```

## GitHub Pages deployment

A GitHub Actions workflow is included at `.github/workflows/deploy-pages.yml`.

1. In your GitHub repo settings, enable **Pages** and set source to **GitHub Actions**.
2. Push to `main` (or run the workflow manually from the Actions tab).
3. The workflow builds `dist/` and publishes it to GitHub Pages.

For cPanel deployment, upload the contents of `dist/` to your target web root folder.

## Troubleshooting blank page on static hosts

If the page loads blank, your host is usually serving the source repository directly instead of the Vite build output.

- Build first: `npm run build`
- Deploy the contents of `dist/` (not `src/`, `index.html`, and config files from the repo root)
- On GitHub Pages, use the included workflow and keep Pages source set to **GitHub Actions**

The `index.html` now contains a fallback message to make this deployment issue visible instead of showing an empty page.
