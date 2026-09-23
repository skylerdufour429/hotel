const appTableBody = document.querySelector('#appTableBody');
const searchInput = document.querySelector('#searchInput');
const platformFilter = document.querySelector('#platformFilter');
const clearFiltersButton = document.querySelector('#clearFilters');
const resultCount = document.querySelector('#resultCount');
const installButton = document.querySelector('#installButton');

let apps = [];
let deferredPrompt = null;

const formatStoreUrl = (name) =>
  `https://apps.apple.com/us/search?term=${encodeURIComponent(name)}`;

async function loadApps() {
  const response = await fetch('./apps.json');
  if (!response.ok) {
    throw new Error('Unable to load app catalog data.');
  }

  apps = await response.json();
  renderApps();
}

function filterApps() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedPlatform = platformFilter.value;

  return apps.filter((app) => {
    const searchableString = [
      app.appName,
      app.bundleId,
      app.platform,
      app.version,
      app.minOs,
      app.fileSize,
    ]
      .join(' ')
      .toLowerCase();

    const matchesQuery = !query || searchableString.includes(query);
    const matchesPlatform = selectedPlatform === 'all' || app.platform === selectedPlatform;

    return matchesQuery && matchesPlatform;
  });
}

function renderApps() {
  const filteredApps = filterApps();
  resultCount.textContent = `${filteredApps.length} app${filteredApps.length === 1 ? '' : 's'}`;

  if (!filteredApps.length) {
    appTableBody.innerHTML = `
      <tr class="empty-row">
        <td colspan="7">No apps match your current search. Try a different keyword or platform filter.</td>
      </tr>
    `;
    return;
  }

  appTableBody.innerHTML = filteredApps
    .map(
      (app) => `
        <tr>
          <td class="app-name">${app.appName}</td>
          <td class="bundle-id">${app.bundleId}</td>
          <td class="meta-value">${app.version}</td>
          <td class="meta-value">${app.platform}</td>
          <td class="meta-value">${app.minOs}</td>
          <td class="meta-value">${app.fileSize}</td>
          <td>
            <a
              class="store-button"
              href="${app.appStoreSearchUrl || formatStoreUrl(app.appName)}"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Install ${app.appName} on the App Store"
            >
              Install
            </a>
          </td>
        </tr>
      `
    )
    .join('');
}

searchInput.addEventListener('input', renderApps);
platformFilter.addEventListener('change', renderApps);
clearFiltersButton.addEventListener('click', () => {
  searchInput.value = '';
  platformFilter.value = 'all';
  renderApps();
});

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installButton.hidden = false;
});

installButton.addEventListener('click', async () => {
  if (!deferredPrompt) {
    return;
  }

  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;

  if (choice.outcome === 'accepted') {
    installButton.hidden = true;
  }

  deferredPrompt = null;
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((error) => {
      console.warn('Service worker registration failed:', error);
    });
  });
}

loadApps().catch((error) => {
  appTableBody.innerHTML = `
    <tr class="empty-row">
      <td colspan="7">${error.message}</td>
    </tr>
  `;
});
