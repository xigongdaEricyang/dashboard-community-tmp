import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import { createProxyMiddleware } from 'http-proxy-middleware';
import fs from 'fs';
import path from 'path';

import config from '../config/webpack.config.dev';
import pkg from '../package.json';

const app = express();
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    index: 'index.html',
    // headers: { 'X-Custom-Header': 'yes' },
  })
);

app.use('/api-metrics/*', createProxyMiddleware({
  target: 'http://192.168.8.157:9090',
  pathRewrite: {
    '/api-metrics': '/api/v1',
  },
  changeOrigin: true,
}))

app.use('/api-nebula/*', createProxyMiddleware({
  target: 'http://192.168.8.157:8090',
  pathRewrite: {
    '/api-nebula': '/api',
  },
  changeOrigin: true,
}));

// app.get('/*', (req, _res, next) => {
//   if (!req.url.match('static') && !req.url.match('/__webpack_hmr') && !req.url.match('bundle.js')) {
//       req.url = '/'; 
//   }
//   next();
// });

app.get('/api/app', (_req, res) => {
  res.send({
    version: pkg.version,
  })
});

app.get('/api/config/custom', async (_req, res) => {
  const data = await fs.readFileSync(path.join(__dirname, '../static/custom.json'), 'utf8');
  if (data) {
    res.send({
      code: 0,
      data: JSON.parse(data)
    });
  } else {
    res.send({
      code: -1,
      data: null
    });
  }
});

app.get(/^(?!^\/api\/)/, (_req, res) => {
  res.redirect('/');
});

app.listen(7004, function () {
  console.log('Example app listening on port 7004!\n');
});