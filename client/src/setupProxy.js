const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://codetech.nworld.dev',
      changeOrigin: true,
    })
  );
};
