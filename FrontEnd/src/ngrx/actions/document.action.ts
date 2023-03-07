import { createAction, props } from "@ngrx/store";


export const DocumentActions={
  getAll:createAction('[Document] Get All'),
  getAllSuccess:createAction('[Document] Get All Success',props<{documents:any[]}>()),
  getAllFail:createAction('[Document] Get All Fail',props<{error:string}>()),
}
