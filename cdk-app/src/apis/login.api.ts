import { http } from "@/utils/request"

type Res<T> = {
  code: number;
  msg: string;
  data: T;
}

export const apiLogin = (code: string) => {
  return http.post<Res<{ openid: string; sessionKey: string; }>>(`/wechat/login`, { code })
}