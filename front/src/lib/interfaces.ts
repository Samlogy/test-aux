export interface ICat {
  id?: number | string;
  name: string;
  age: number | string;
  race: string;
  town: string;
  sex: string;
  description: string;
  picture: string;
  status: string;
  popularity: number;
  isReqAdopt?: boolean;
}
