'use strict';

const fetch = require('node-fetch');
const server = require('../src/server');
const { expect, should } = require('chai');

describe('API', () => {

  before(async () => {
    should().exist(server);
    const port = process.env.HTTP_PORT || 3000;
    this.url = `http://localhost:${port}`;
  });

  it('HTTP Server', done => {
    should().exist(server);

    done();
  });

  it('(GET) http://.../ping', async () => {
    const { status } = await fetch(`${this.url}/ping`, { method: 'GET' });
    expect(status).to.be.equal(200);
  });

  it('(GET) http://.../metrics', async () => {
    const response = await fetch(`${this.url}/metrics`, { method: 'GET' });
    expect(response.status).to.be.equal(200);

    const text = await response.text();
    should().exist(text);
  });
});
