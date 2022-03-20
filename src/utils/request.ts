/*
 * @Date: 2021-09-07 10:51:39
 * @LastEditors: <oukaijun@mininglamp.com>
 * @LastEditTime: 2021-09-07 10:51:39
 * @Description: In User Settings Edit
 */
import { message } from 'antd';
import { history } from 'umi';
import { extend } from 'umi-request';

import { random } from '@/utils/utils';

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response; data: any }): { response: any } | {} => {
  const { response, data } = error;
  Object.assign(response, { data });

  if (response?.status) {
    const { status } = response;

    // 额外处理token过期情况
    if (status === 401 && process.env.NODE_ENV === 'production') {
      localStorage.removeItem('access_token');
      localStorage.setItem('loginState', random(16));
    }
    const { code, msg } = data || {};
    if (status !== 200 && code !== 200 && msg) {
      message.error(msg);
    }
    // --------处理 异常的状态码-------
  } else if (!response) {
    message.error('您的网络发生异常，无法连接服务器');
  }
  return { response } || {};
};

/**
 * 配置request请求时的默认参数
 */
const createRequest = (prefix: string) => {
  const middlewaresExtend = extend({
    errorHandler, // 默认错误处理
    credentials: 'include', // 默认请求是否带上cookie
    getResponse: true,
    prefix: prefix,
    headers: {
      'X-Auth-Token': localStorage.getItem('access_token') as string,
      'X-Request-Source': 'CRM', // 后端要求传这个值过去
    },
  });

  // request拦截器, 处理request, 改变url 或 options.
  middlewaresExtend.interceptors.request.use((url, options) => {
    const { pathname, query: routeQuery } = history.location;
    const queryObj = Object.entries(routeQuery as any);
    const headers: { [keyword: string]: any } = {};
    if (queryObj?.length) {
      queryObj.forEach(([key, value]) => {
        headers[key] = encodeURIComponent(value as string);
      });
    }
    return {
      url,
      options: { ...options, headers: headers },
    };
  });

  // response拦截器, 处理response
  // middlewaresExtend.interceptors.response.use((response, options) => {
  //   dosomething
  //   return response;
  // });

  return middlewaresExtend;
};

const request = {
  v0: createRequest(''),
  v1: createRequest('/api_v1'),
  v2: createRequest('/api_java'),
  v3: createRequest('/api_bom'),
  hc: createRequest('/api_extend'),
};

export default request;
