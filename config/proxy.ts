/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 */
// const DEVELOPMENT_PROXY = 'https://ww8957798d479feaf4-1000084.scrm.nequal.com';
// const DEVELOPMENT_PROXY = 'https://wx536da93b1095affe-1000084.qitianzhen.cn';
// const DEVELOPMENT_PROXY = 'http://192.168.7.87:9999'; // 后端IP--930
const DEVELOPMENT_PROXY = 'http://192.168.7.136:9988'; // 后端IP-1130

export default {
  dev: {
    '/sibar/koan': {
      // '/api':匹配项
      target: DEVELOPMENT_PROXY, // 接口的域名
      changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      pathRewrite: { '^/sibar/koan': '' },
    },
    '/api_v1': {
      // '/api':匹配项
      target: DEVELOPMENT_PROXY, // 接口的域名
      changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      pathRewrite: { '^': '' },
    },
    '/api_java': {
      // '/api':匹配项
      target: DEVELOPMENT_PROXY, // 接口的域名
      changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      pathRewrite: { '^': '' },
    },
    '/api_bom': {
      // '/api':匹配项
      target: DEVELOPMENT_PROXY, // 接口的域名
      changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      pathRewrite: { '^': '' },
    },
    '/api_extend': {
      // '/api':匹配项
      target: DEVELOPMENT_PROXY, // 接口的域名
      changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      pathRewrite: { '^': '' },
    },
  },
};
