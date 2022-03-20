import { defineConfig } from 'umi';

import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

// ref: https://umijs.org/config/
export default defineConfig({
  antd: {},
  base: '/sibar',
  publicPath: process.env.NODE_ENV === 'production' ? '/sibar/' : '/',
  dva: {
    hmr: true,
  },
  dynamicImport: {},
  nodeModulesTransform: { type: 'none' },
  routes,
  // @ts-ignore
  proxy: proxy[REACT_APP_ENV || 'dev'],
  fastRefresh: {},
});
