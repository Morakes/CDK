import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { message as Message } from 'ant-design-vue';
import { clearAuthority, getAuthority, redirect } from '../auth';
import type { Dayjs } from 'dayjs';
import QueryString from 'qs';

const baseAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + '',
  timeout: 60000,
});

const errorHandle = (error: AxiosError) => {
  if (error.response) {
    const status = error.response?.status;
    let message = '';
    switch (status) {
      case 401:
        message = '无权限';
        clearAuthority();
        redirect();
        break;
      case 403:
        message = '拒绝访问';
        break;
      case 404:
        message = '请求不地址存在';
        break;
      case 500:
        message = 'Network Error';
        break;
      default:
        message = '接口出错，请联系相关人员';
        break;
    }
    Message.error(message);
    return Promise.reject(error);
  }
  Message.error(error.message);
  return Promise.reject(error);
};
//响应拦截器
baseAxios.interceptors.response.use((response: AxiosResponse) => {
  const { data, status } = response;

  if (status !== 200) return Promise.reject(data);
  if (data.reason === 'SUCCESS') {
    return data;
  } else {
    Message.error(data.message);
    return Promise.reject(data);
  }
}, errorHandle);
//请求拦截器
// @ts-ignore
baseAxios.interceptors.request.use((config: AxiosRequestConfig) => {
  const auth = getAuthority();
  return {
    ...config,
    headers: {
      Authorization: auth && auth.token,
    },
  };
}, errorHandle);

const request = <T = any>(config: AxiosRequestConfig) => {
  return new Promise<T>((resolve, reject) => {
    baseAxios
      .request<any, T>(config)
      .then((res: T) => {
        resolve(res);
      })
      .catch((err: unknown) => {
        reject(err);
      });
  });
};

const get = <T = any>(config?: {
  url: string;
  params?: Record<string, Number | String | Boolean | Dayjs | Array<any>> | URLSearchParams;
}) => {
  return request<T>({
    ...config,
    paramsSerializer: {
      serialize: (params) => QueryString.stringify(params, { arrayFormat: 'repeat' }),
    },
    method: 'GET',
  });
};

const post = <T = any>(config?: AxiosRequestConfig) =>
  request<T>({
    ...config,
    method: 'POST',
  });

const put = <T = any>(config?: { url: string; data?: Record<string, any> }) =>
  request<T>({
    ...config,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const del = <T = any>(config?: { url: string }) => request<T>({ ...config, method: 'DELETE' });

export { get, post, del, put, request };
