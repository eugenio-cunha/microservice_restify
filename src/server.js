'use strict';

const router = require('./router');
const middleware = require('./middleware');
const { createServer } = require('restify');

/**
 * @description Intâcia o HTTP server do microsserviço
 * @param {Function} router Rotas do microsserviço
 * @param {Function} middleware Middlewares do microsserviço
 *
 * @returns {Object} Retorna uma instância HTTP server
 */
const server = (router, middleware) => {
  const server = createServer();

  if (middleware) middleware(server);
  if (router) router(server);

  const { npm_package_name, npm_package_version, HTTP_PORT, NODE_ENV } = process.env;

  return server.listen(parseInt(HTTP_PORT || 80, 10),
    () => console.info(`⚡ ${npm_package_name} ${npm_package_version} ${NODE_ENV}\n⏳ ${new Date()}`)
  );
};

module.exports = server(router, middleware);
