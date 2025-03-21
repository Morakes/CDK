import { getUserInfo } from '@/services/commonApi';

export type LoginStatusType = {
  token?: string;
};

/**
 * 获取认证信息
 * @returns
 */

export const getAuthority = () => {
  return JSON.parse(localStorage.getItem('auth') as string | '');
};

/**
 * 清除认证信息
 */
export const clearAuthority = () => {
  localStorage.removeItem('auth');
};

/**
 * 保存认证信息
 */
export const setAuthority = ({ token }: LoginStatusType) => {
  const next = {
    token,
  };

  localStorage.setItem('auth', JSON.stringify(next));
};

/**
 * 跳转登录页
 */
export const redirect = () => {
  window.location.href = import.meta.env.VITE_AUTH_URL;
};

/**
 * 获取网页token 或者 通过给定url获取token
 * @param url
 * @returns
 */
export const getToken: (url?: string) => string = (url?: string) => {
  const { token: storageToken } = getAuthority() ?? {};

  if (!url && !window.location.search) {
    if (storageToken) {
      return storageToken;
    }
    return '';
  }

  const params = (url ?? window.location.search).split('?')?.[1]?.split('&') ?? [];
  const searchMap: Record<string, string> = {};
  params.forEach((item: string) => {
    if (item.includes('=')) {
      const temp = item.split('=');
      searchMap[temp[0]] = temp[1];
    }
  });
  return searchMap['token'];
};

/**
 * 登录
 * @returns
 */
export const login = () => {
  return new Promise((resolve, reject) => {
    const oaToken = getToken();
    if (!oaToken) {
      redirect();
      return;
    }
    try {
      getUserInfo(oaToken).then((res) => {
        const {
          data: { token },
        } = res;
        setAuthority({
          token: token,
        });
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};
