import axios from 'axios';
import { IGameCDKType, IGameType } from './type';

/**
 * 获取游戏列表
 * @returns
 */
export const apiGetGameList = () => {
  return axios.get<Res<IGameType[]>>('/api/games').then((res) => {
    return res.data;
  });
};

/**
 * 添加游戏
 * @param data
 * @returns
 */
export const apiAddGame = (data: IGameType) => {
  return axios.post<Res<IGameType>>('/api/games', data).then((res) => {
    return res.data;
  });
};

/**
 * 更新游戏
 * @param data
 * @returns
 */
export const apiUpdateGame = (data: IGameType) => {
  return axios.patch<Res<IGameType>>('/api/games/' + data.id, data).then((res) => {
    return res.data;
  });
};

// export const api
export const apiGameAI = (id: number) => {
  return axios.get<Res<IGameType>>('/api/games/ai?id=' + id).then((res) => {
    return res.data;
  });
};

export const apiBatchUploadCdk = (id: number, data: IGameCDKType[]) => {
  return axios.post('/api/cdk/batch/' + id, JSON.parse(data)).then((res) => {
    return res.data;
  });
};
