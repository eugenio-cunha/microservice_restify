'use strict';

const { plugins } = require('restify');

/**
 * @description Inicializa os middlewares do microsserviço
 * @param {Object} server HTTP server
 */
module.exports = server => {
  server.use([
    plugins.bodyParser(),
    plugins.queryParser()
  ]);
};
