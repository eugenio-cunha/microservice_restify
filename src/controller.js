'use strict';

const prometheus = require('./prometheus');

/**
 * @description Ping do microsserviço
 * @param {Request} _ Request da requisição
 * @param {Response} res Response da requisição
 */
exports.ping = (_, res) => res.send({ pong: process.env.npm_package_version });

/**
 * @description Métricas do microsserviço
 * @param {Request} _ Request da requisição
 * @param {Response} res Response da requisição
 */
exports.metrics = async (_, res) => {
  const { type, values } = await prometheus.metrics();
  res.setHeader('content-type', type);
  res.send(200, values);
};
