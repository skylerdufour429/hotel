# App Information — GitHub Pages + Codespaces

A small static web app for displaying iOS app metadata and App Store search links.

## Included fields

- App Name
- Bundle ID
- Version
- Platform
- Minimum OS
- File Size
- App Store install/search button
- Add to Home Screen support for the web app

## Run in GitHub Codespaces

No build system is required.

```bash
python3 -m http.server 8000
```

Then open port **8000** in the Codespaces Ports panel.

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Upload/push this project.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Save.

GitHub Pages will serve `index.html`.

## App Store links

The demo intentionally uses an App Store **search URL** for each app rather than inventing an App Store product ID. If you have verified App Store listing URLs, replace `appStoreSearchUrl()` in `app.js` with the exact URL stored in `apps.json`.

## Important

The metadata in this demo is based on the supplied list and is not independently verified. Historical apps may no longer be available on the App Store, and their current minimum OS requirements or listing URLs may differ.

The **Add to Home Screen** button installs this GitHub Pages website as a web app/PWA where supported. It does not install an iOS App Store binary.

## Suggested repository structure

```text
.
├── .devcontainer/
│   └── devcontainer.json
├── .gitignore
├── .nojekyll
├── app.js
├── apps.json
├── index.html
├── manifest.webmanifest
├── styles.css
└── README.md
```
