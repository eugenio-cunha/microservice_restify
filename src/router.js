'use strict';

const controller = require('./controller');

/**
 * @description Inicializa as rotas do microsserviço
 * @param {Object} server HTTP server
 */
module.exports = server => {
  server.get('/ping', controller.ping);
  server.get('/metrics', controller.metrics);
};
