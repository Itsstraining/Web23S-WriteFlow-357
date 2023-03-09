import { UserModel } from "src/app/models/user.model";

export interface UserState{
  user:UserModel|null;
  users:UserModel[]|null;
  loading:boolean;
  error:string|null;
  inProcess:boolean;



}
