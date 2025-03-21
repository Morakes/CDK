// 请求基础URL
// #ifdef H5
const baseURL = '/api';
// #endif
// #ifdef MP-WEIXIN
const baseURL = import.meta.env.PROD ? 'https://your-production-api.com' : 'http://127.0.0.1:3111';
// #endif

// 请求配置接口
interface RequestConfig extends UniApp.RequestOptions {
  baseURL?: string;
  custom?: any;
}

// 请求拦截器
const requestInterceptor = (config: RequestConfig): RequestConfig => {
  const openid = uni.getStorageSync('openid');
  
  config.header = {
    ...config.header,
    // #ifdef MP-WEIXIN
    'content-type': 'application/json',
    'X-WX-OPENID': openid,
    // #endif
    // #ifdef H5
    'Content-Type': 'application/json',
    // #endif
  }

  // 处理URL
  if (config.baseURL) {
    config.url = `${config.baseURL}${config.url}`;
  } else {
    config.url = `${baseURL}${config.url}`;
  }
  
  return config;
};

// 响应拦截器
const responseInterceptor = (response: UniApp.RequestSuccessCallbackResult) => {
  const { statusCode, data } = response;
  
  // 请求成功
  if (statusCode >= 200 && statusCode < 300) {
    return data;
  }
  
  // 处理特定状态码
  switch (statusCode) {
    case 401:
      // 未授权，清除token并跳转到登录页
      uni.removeStorageSync('token');
      uni.showToast({
        title: '请重新登录',
        icon: 'none'
      });
      // 可以在这里添加跳转登录页的逻辑
      break;
    case 403:
      uni.showToast({
        title: '没有权限访问',
        icon: 'none'
      });
      break;
    case 404:
      uni.showToast({
        title: '请求的资源不存在',
        icon: 'none'
      });
      break;
    default:
      uni.showToast({
        title: '请求失败',
        icon: 'none'
      });
  }
  
  return Promise.reject(response);
};

// 创建请求实例
const request = <T = any>(config: RequestConfig): Promise<T> => {
  // 应用请求拦截器
  const finalConfig = requestInterceptor({
    ...config,
    baseURL: config.baseURL || baseURL
  });
  
  return new Promise((resolve, reject) => {
    uni.request({
      ...finalConfig,
      success: (response) => {
        try {
          const result = responseInterceptor(response);
          resolve(result as T);
        } catch (error) {
          reject(error);
        }
      },
      fail: (error) => {
        uni.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
        reject(error);
      }
    });
  });
};

// 封装常用请求方法
export const http = {
  get: <T = any>(url: string, params?: any, config: Omit<RequestConfig, 'url' | 'data' | 'method'> = {}) => {
    return request<T>({
      ...config,
      url,
      method: 'GET',
      data: params
    });
  },
  
  post: <T = any>(url: string, data?: any, config: Omit<RequestConfig, 'url' | 'data' | 'method'> = {}) => {
    return request<T>({
      ...config,
      url,
      method: 'POST',
      data
    });
  },
  
  put: <T = any>(url: string, data?: any, config: Omit<RequestConfig, 'url' | 'data' | 'method'> = {}) => {
    return request<T>({
      ...config,
      url,
      method: 'PUT',
      data
    });
  },
  
  delete: <T = any>(url: string, data?: any, config: Omit<RequestConfig, 'url' | 'data' | 'method'> = {}) => {
    return request<T>({
      ...config,
      url,
      method: 'DELETE',
      data
    });
  }
};

// 导出请求实例
export default request;