# App Catalog

A responsive static web app for browsing a catalog of 20 supplied apps with search and filtering, App Store install links, and PWA support for adding the site to a home screen.

## Features

- Search and filter interface
- All 20 supplied apps included
- App Name, Bundle ID, Version, Platform, Minimum OS, and File Size
- Install app on App Store search buttons
- Add to Home Screen PWA support
- GitHub Pages deployment guidance
- Codespaces configuration
- Responsive mobile and desktop layout

## Local preview

No build step is required. From the project root, run:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 or the forwarded port in Codespaces.

## GitHub Pages deployment

1. Push this folder to a GitHub repository.
2. Open the repository settings.
3. Select Pages from the left navigation.
4. Choose Deploy from a branch.
5. Select the main branch and the root folder /.
6. Save and wait for the GitHub Pages URL to publish.

The app is designed to serve from a static GitHub Pages site, and the repository includes a .nojekyll file for compatibility.

## Codespaces

The project includes a devcontainer configuration that automatically forwards port 8000 and starts the local server when the environment is created.

## PWA install support

The page registers a service worker and includes a manifest so supported browsers can offer an Add to Home Screen option. In Safari, users can also tap the Share button and choose Add to Home Screen.

## Project structure

```text
.
├── .devcontainer/
│   └── devcontainer.json
├── .gitignore
├── .nojekyll
├── app.js
├── apps.json
├── icons/
│   ├── icon-192.svg
│   └── icon-512.svg
├── index.html
├── manifest.webmanifest
├── styles.css
├── sw.js
└── README.md
```
