'use strict';

const { Registry, collectDefaultMetrics } = require('prom-client');

class Prometheus {

  constructor(prefix, timeout) {
    this.instance = null;
    this.register = this.init(prefix, timeout);
  }

  /**
   * @description Configura o registro das metricas
   * @param {String} prefix Prefixo das mestricas (default nome do microsserviço)
   * @param {Number} timeout Intervalo de registro das metricas (default 30000MS)
   */
  init(prefix = process.env.npm_package_name, timeout = 30000) {
    const register = new Registry();
    collectDefaultMetrics({ prefix: `${prefix}_`, timeout, register });
    return register;
  }

  /**
   * @description Inicializa uma instância Singleton do Prometheus
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
   * @description Retorna as métricas do microsserviço
   *
   * @returns {Object} Metricas do microsserviço
   */
  async metrics() {
    return {
      type: this.register.contentType,
      values: await this.register.metrics()
    };
  }

}

module.exports = Prometheus.singleton();
