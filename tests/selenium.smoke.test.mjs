// tests/selenium.smoke.test.mjs
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import chromedriver from 'chromedriver'; // v140 should be installed

const APP_URL = process.env.APP_URL || 'http://localhost:3000';
const CHROME_BIN = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

describe('ETHVault – Selenium smoke', function () {
  this.timeout(120_000);
  let driver;

  before(async function () {
    // Route ChromeDriver logs to a file so we can inspect if it hangs
    const service = new chrome.ServiceBuilder(chromedriver.path)
      .loggingTo('chromedriver.log')
      .enableVerboseLogging();

    const options = new chrome.Options()
      .setChromeBinaryPath(CHROME_BIN)
      .addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1366,900');

    console.log('[Selenium] building driver…');
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeService(service)   // <- force npm chromedriver@140
      .setChromeOptions(options)   // <- force your Chrome binary
      .build();

    const session = await driver.getSession();
    console.log('[Selenium] session:', session?.getId?.());

    console.log('[Selenium] navigating to', APP_URL);
    await driver.get(APP_URL);

    console.log('[Selenium] waiting for base shell…');
    await driver.wait(until.elementLocated(By.css('header, nav, main')), 60_000);
    console.log('[Selenium] base shell located');
  });

  after(async function () {
    if (driver) await driver.quit();
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
