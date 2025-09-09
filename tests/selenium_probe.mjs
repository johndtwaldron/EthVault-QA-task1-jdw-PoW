import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import chromedriver from 'chromedriver';

const CHROME_BIN = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const service = new chrome.ServiceBuilder(chromedriver.path)
    .loggingTo('chromedriver.log')
    .enableVerboseLogging();
  const options = new chrome.Options()
    .setChromeBinaryPath(CHROME_BIN)
    .addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage');

  console.log('[probe] building driver…');
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeService(service)
    .setChromeOptions(options)
    .build();

  const caps = await driver.getCapabilities();
  console.log('[probe] browserName:', caps.get('browserName'));
  console.log('[probe] browserVersion:', caps.get('browserVersion'));

  await driver.get('about:blank');
  console.log('[probe] title:', await driver.getTitle());

  await driver.quit();
  console.log('[probe] OK');
})().catch(e => {
  console.error('[probe] FAILED:', e);
  process.exit(1);
});
