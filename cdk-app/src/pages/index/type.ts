export interface IGameType {
  id: number;
  name: string;
  cover: string;
  cdkList: IGameCDKType[];
}

export interface IGameCDKType {
  title: string;
  code: string;
  reward: string;
  isValid: boolean;
  endTime: string;
}