import type { IGameCDKType, IGameType } from "@/pages/index/type";
import { http } from "@/utils/request";

type Res<T> = {
  code: number;
  msg: string;
  data: T;
}
/**
 * 获取游戏列表
 * @returns 
 */
export const apiGetGameList = () => {
  return http.get<Res<IGameType[]>>('/games').then((res) => {
    return res
  })
}

/**
 * 搜索游戏
 * @param name 
 * @returns 
 */
export const apiSearchGame = (name: string) => {
  return http.get<Res<IGameType[]>>('/games/search', { name }).then((res) => {
    return res
  })
}

/**
 * 获取banner列表
 */
export const apiGetBannerList = () => {
  return http.get('/banner').then((res) => {
    return res
  })
}

/**
 * 获取cdk列表
 * @param id 
 * @returns 
 */
export const apiGetCdks = (id: number) => {
  return http.get<Res<IGameCDKType[]>>('/cdk/game', { gameId: id }).then((res) => {
    return res
  })
}