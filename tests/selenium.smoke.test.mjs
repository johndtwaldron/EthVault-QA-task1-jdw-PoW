// tests/selenium.smoke.test.mjs
import fs from 'node:fs';
import path from 'node:path';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import chromedriver from 'chromedriver';

// -----------------------------
// Local/CI config (portable)
// -----------------------------
const APP_URL = process.env.APP_URL || 'http://127.0.0.1:3000';

// HEADLESS: default true. Set HEADLESS=false to watch the browser.
const HEADLESS = (process.env.HEADLESS || 'true').toLowerCase() !== 'false';

// CHROME_BIN: prefer env; otherwise pick a sensible OS default.
function guessChrome() {
  if (process.env.CHROME_BIN && fs.existsSync(process.env.CHROME_BIN)) {
    return process.env.CHROME_BIN;
  }

  // Windows (64-bit and 32-bit program files)
  const win64 = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const win32 = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
  if (process.platform === 'win32') {
    if (fs.existsSync(win64)) return win64;
    if (fs.existsSync(win32)) return win32;
  }

  // macOS
  const mac = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  if (process.platform === 'darwin' && fs.existsSync(mac)) return mac;

  // Linux (common paths)
  const linux = ['/usr/bin/google-chrome', '/usr/bin/chromium-browser', '/usr/bin/chromium'];
  for (const p of linux) {
    if (fs.existsSync(p)) return p;
  }

  // Let Selenium try to find Chrome if none matched
  return null;
}

const CHROME_BIN = guessChrome();

// Ensure artifacts dir exists for logs/screens
const ARTIFACTS = path.join(process.cwd(), 'test-results');
fs.mkdirSync(ARTIFACTS, { recursive: true });

// -----------------------------
// Test suite
// -----------------------------
describe('ETHVault – Selenium smoke', function () {
  this.timeout(120_000);
  let driver;

  before(async function () {
    // Route ChromeDriver logs to a file so we can inspect if it hangs
    const service = new chrome.ServiceBuilder(chromedriver.path)
      .loggingTo(path.join(ARTIFACTS, 'chromedriver.log'))
      .enableVerboseLogging();

    const options = new chrome.Options();
    if (CHROME_BIN) options.setChromeBinaryPath(CHROME_BIN);
    options.addArguments('--no-sandbox', '--disable-dev-shm-usage', '--window-size=1366,900');
    if (HEADLESS) options.addArguments('--headless=new');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeService(service)   // use npm chromedriver (v140)
      .setChromeOptions(options)   // local Chrome, if found
      .build();

    await driver.get(APP_URL);
    await driver.wait(until.elementLocated(By.css('header, nav, main')), 60_000);
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  // Optional: on failure, save a screenshot to test-results
  afterEach(async function () {
    if (this.currentTest?.state === 'failed' && driver) {
      const png = await driver.takeScreenshot();
      const name = this.currentTest.title.replace(/[^\w.-]+/g, '_') + '.png';
      fs.writeFileSync(path.join(ARTIFACTS, name), png, 'base64');
    }
  });

  it('shows Connect Wallet', async function () {
    const btn = await driver.wait(
      until.elementLocated(By.xpath("//button[normalize-space()='Connect Wallet']")),
      30_000
    );
    await driver.wait(until.elementIsVisible(btn), 15_000);
  });

  it('top nav tabs render', async function () {
    const tabs = ['Dashboard', 'Deposit', 'Stake', 'Leaderboard', 'Governance'];
    for (const label of tabs) {
      const link = await driver.wait(
        until.elementLocated(By.xpath(`//nav//a[normalize-space()='${label}']`)),
        20_000
      );
      await driver.wait(until.elementIsVisible(link), 10_000);
    }
  });
});
