import { post } from '@/utils/http/request';

/**
 * 模拟登录接口
 * @param data
 * @returns
 */
export function getUserInfo(token: string) {
  return post<{
    data: any;
  }>({
    url: 'xxxxx',
    data: {
      token: token,
    },
  });
}
