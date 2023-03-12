import { createAction, props } from "@ngrx/store";
import { UserModel } from "src/app/models/user.model";


export const UserAction={
  register:createAction('[User] Register'),
  registerSuccess:createAction('[User] Register Success'),
  registerFailure:createAction('[User] Register Failure',props<{error:string}>()),

  get:createAction('[User] Get User'),
  getSuccess:createAction('[User] Get User Success',props<{user:UserModel}>()),
  getFailure:createAction('[User] Get User Failure',props<{error:string}>()),

  getAll:createAction('[User] Get All User'),
  getAllSuccess:createAction('[User] Get All User Success',props<{users:UserModel[]}>()),
  getAllFailure:createAction('[User] Get All User Failure',props<{error:string}>()),



}
