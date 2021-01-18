'use strict';

const { Registry, collectDefaultMetrics } = require('prom-client');

class Prometheus {

  constructor(prefix, timeout) {
    this.instance = null;
    this.register = this.init(prefix, timeout);
  }

  /**
   * @description Configura o registro de metricas
   * @param {String} prefix Prefixo das mestricas (default nome do microsserviço)
   * @param {Number} timeout Intervalo de registro das metricas (default 30000MS)
   */
  init(prefix = process.env.npm_package_name, timeout = 30000) {
    const register = new Registry();
    collectDefaultMetrics({ prefix: `${prefix}_`, timeout, register });
    return register;
  }

  /**
   * @description Obtém uma instância Singleton do Prometheus
   * @param {String} name Prefix das metricas
   * @param {Number} timeout Timeout da metricas
   *
   * @returns {Object} retorna uma instância Singleton do Cliente Prometheus
   */
  static singleton(prefix, timeout) {
    if (!Prometheus.instance) {
      Prometheus.instance = new Prometheus(prefix, timeout);
    }

    return Prometheus.instance;
  }

  /**
   * @description Retorna as metricas do microsserviço
   *
   * @returns {String} Metricas do microsserviço
   */
  async metrics () {
    const type = this.register.contentType;
    const values = await this.register.metrics();
    return { type, values };
  }

}

module.exports = Prometheus.singleton();
