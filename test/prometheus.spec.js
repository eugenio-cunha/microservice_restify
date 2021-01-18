'use strict';

const { should, expect } = require('chai');
const prometheus = require('../src/prometheus');

describe('Prometheus', () => {

  it('Metrics', async () => {
    const { type, values } = await prometheus.metrics();

    should().exist(type);
    should().exist(values);
    expect(type).to.be.equal('text/plain; version=0.0.4; charset=utf-8');

  });
});
