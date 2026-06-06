import {spawn} from 'node:child_process';
import {mkdirSync, mkdtempSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const outputDir = resolve('public/pasquin-work/projects');
const viewport = {width: 1440, height: 935, deviceScaleFactor: 1};

const projects = [
  ['kaos-lifestyle', 'https://kaoslifestyle.com/'],
  ['carpette-multi-design', 'https://carpettemultidesign.com/'],
  ['mystea', 'https://mystea.ca/'],
  ['sportive-plus', 'https://sportiveplus.com/'],
  ['rd-cosmetic', 'https://rdcosmetic.com/'],
  ['pianos-bolduc', 'https://pianosbolduc.com/'],
  ['artfil', 'https://wholesale.artfil.ca/'],
  ['liberty-sleep', 'https://libertysleep.ca/'],
  ['maeva-body-jewelry', 'https://www.maebodyjewelry.com/'],
  ['botanix', 'https://botanix.com/'],
  ['rcgt', 'https://www.rcgt.com/en/tax-planning-guide/'],
  ['message-factory', 'https://messagefactory.ca/'],
  ['maison-margan', 'https://maisonmargan.com/'],
  ['md-tissage', 'https://mdtissage.com/'],
  ['andreea-gavrila', 'https://andreeagavrila.ca/'],
  ['spinelli', 'https://spinellidirect.com/'],
  ['consulis', 'https://consulis.com/'],
  ['barry', 'https://www.barry.ca/'],
  ['luc-vincent', 'https://lucvincent.com/'],
  ['wachiya', 'https://wachiya.com/'],
];

mkdirSync(outputDir, {recursive: true});

for (const [index, project] of projects.entries()) {
  const [slug] = project;

  try {
    await captureProject(project, 9320 + index);
    console.warn(`${slug}: captured`);
  } catch (error) {
    console.error(`${slug}: failed`);
    console.error(error instanceof Error ? error.message : error);
  }
}

async function captureProject([slug, url], port) {
  const profilePath = mkdtempSync(join(tmpdir(), `pasquin-chrome-${slug}-`));

  const browser = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--hide-scrollbars',
    '--ignore-certificate-errors',
    '--no-first-run',
    '--no-default-browser-check',
    '--remote-allow-origins=*',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profilePath}`,
    `--window-size=${viewport.width},${viewport.height}`,
    'about:blank',
  ]);

  let stderr = '';
  browser.stderr.on('data', (chunk) => {
    stderr += chunk.toString();
  });

  try {
    const page = await getDebugPage(port);
    const client = await createCdpClient(page.webSocketDebuggerUrl);

    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Network.enable');
    await client.send('Emulation.setDeviceMetricsOverride', {
      ...viewport,
      mobile: false,
      screenWidth: viewport.width,
      screenHeight: viewport.height,
    });

    await client.send('Page.navigate', {url});
    await delay(7500);
    await hideOverlays(client);
    await delay(1250);
    await client.send('Runtime.evaluate', {
      expression: 'window.scrollTo(0, 0)',
      awaitPromise: false,
    });

    const result = await client.send('Page.captureScreenshot', {
      format: 'jpeg',
      quality: 82,
      fromSurface: true,
      captureBeyondViewport: false,
    });

    writeFileSync(join(outputDir, `${slug}.jpg`), Buffer.from(result.data, 'base64'));
    client.close();
  } finally {
    browser.kill('SIGTERM');
    await delay(250);
  }

  if (stderr.includes('bind() failed')) {
    throw new Error(stderr);
  }
}

async function getDebugPage(port) {
  const started = Date.now();

  while (Date.now() - started < 10000) {
    try {
      const pages = await fetchJson(`http://127.0.0.1:${port}/json/list`);
      const page = pages.find((target) => target.type === 'page');
      if (page?.webSocketDebuggerUrl) return page;
    } catch {
      // Chrome may need another moment before the debug endpoint is ready.
    }

    await delay(200);
  }

  throw new Error(`Chrome did not expose a debug page on port ${port}`);
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.json();
}

async function createCdpClient(url) {
  const socket = new WebSocket(url);
  const callbacks = new Map();
  let nextId = 1;

  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, {once: true});
    socket.addEventListener('error', reject, {once: true});
  });

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !callbacks.has(message.id)) return;

    const {resolve, reject, timeout} = callbacks.get(message.id);
    clearTimeout(timeout);
    callbacks.delete(message.id);

    if (message.error) {
      reject(new Error(message.error.message));
    } else {
      resolve(message.result ?? {});
    }
  });

  return {
    send(method, params = {}, timeoutMs = 20000) {
      const id = nextId++;
      const payload = JSON.stringify({id, method, params});

      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          callbacks.delete(id);
          reject(new Error(`${method} timed out`));
        }, timeoutMs);

        callbacks.set(id, {resolve, reject, timeout});
        socket.send(payload);
      });
    },
    close() {
      socket.close();
    },
  };
}

async function hideOverlays(client) {
  await client.send('Runtime.evaluate', {
    awaitPromise: true,
    expression: String.raw`
      (() => {
        const overlaySelectors = [
          '[id*="cookie" i]', '[class*="cookie" i]',
          '[id*="consent" i]', '[class*="consent" i]',
          '[id*="privacy" i]', '[class*="privacy" i]',
          '[id*="newsletter" i]', '[class*="newsletter" i]',
          '[id*="popup" i]', '[class*="popup" i]',
          '[id*="modal" i]', '[class*="modal" i]',
          '[id*="dialog" i]', '[class*="dialog" i]',
          '[id*="klaviyo" i]', '[class*="klaviyo" i]',
          '.needsclick', '.shopify-pc__banner__dialog',
          '[aria-modal="true"]', '[role="dialog"]',
          '[data-testid*="cookie" i]', '[data-testid*="newsletter" i]',
          'iframe[src*="klaviyo" i]', 'iframe[src*="privy" i]'
        ];

        for (const element of document.querySelectorAll(overlaySelectors.join(','))) {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          const coversEnoughViewport =
            rect.width > window.innerWidth * 0.24 &&
            rect.height > window.innerHeight * 0.08;
          const isFloating =
            style.position === 'fixed' ||
            style.position === 'sticky' ||
            Number(style.zIndex) > 20 ||
            element.getAttribute('aria-modal') === 'true' ||
            element.getAttribute('role') === 'dialog';

          if (coversEnoughViewport && isFloating) {
            element.style.setProperty('display', 'none', 'important');
            element.style.setProperty('visibility', 'hidden', 'important');
            element.style.setProperty('opacity', '0', 'important');
          }
        }

        document.documentElement.style.scrollBehavior = 'auto';
        document.body.style.overflow = 'auto';
        window.scrollTo(0, 0);
      })()
    `,
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
