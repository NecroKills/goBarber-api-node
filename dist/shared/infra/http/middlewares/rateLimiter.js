"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rateLimter;

var _rateLimiterFlexible = require("rate-limiter-flexible");

var _redis = _interopRequireDefault(require("redis"));

var _AppError = _interopRequireDefault(require("../../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Armazenaremos o ip do uusuario e quantidade de requisições no redis
const redisClient = _redis.default.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined
});

const limiter = new _rateLimiterFlexible.RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  // 5 request
  duration: 1 // per 1 second by ip

});

async function rateLimter(req, res, next) {
  try {
    await limiter.consume(req.ip);
    return next();
  } catch (err) {
    throw new _AppError.default('Too many requests', 429);
  }
}