import {User} from "./user";

export interface Thread{

  threadTitle: string;
  userCol: {
    names: string[];
    id: string[];
  }
}
