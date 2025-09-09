// tests/api.ping.test.mjs
import axios from 'axios';
import { strict as assert } from 'assert';

const APP_URL = process.env.APP_URL || 'http://localhost:3000';

describe('ETHVault – API ping', function () {
  this.timeout(30_000);
  it('GET / responds 200', async () => {
    const res = await axios.get(APP_URL, { validateStatus: () => true });
    assert.equal(res.status, 200);
  });
});
