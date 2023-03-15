import { createAction, props } from "@ngrx/store";
import { DocModel } from "src/app/models/doc.model";


export const DocumentActions={
  getAll:createAction('[Document] Get All'),
  getAllSuccess:createAction('[Document] Get All Success',props<{documents:DocModel[]}>()),
  getAllFail:createAction('[Document] Get All Fail',props<{error:string}>()),

  get:createAction('[Document] Get',props<{id:string}>()),
  getSuccess:createAction('[Document] Get Success',props<{document:DocModel}>()),
  getFail:createAction('[Document] Get Fail',props<{error:string}>()),

  getDeleted:createAction('[Document] Get Deleted'),
  getDeletedSuccess:createAction('[Document] Get Deleted Success',props<{documents:DocModel[]}>()),
  getDeletedFail:createAction('[Document] Get Deleted Fail',props<{error:string}>()),

  getShared:createAction('[Document] Get Shared'),
  getSharedSuccess:createAction('[Document] Get Shared Success',props<{documents:DocModel[]}>()),
  getSharedFail:createAction('[Document] Get Shared Fail',props<{error:string}>()),

  create:createAction('[Document] Create',props<{document:DocModel}>()),
  createSuccess:createAction('[Document] Create Success',props<{document:DocModel}>()),
  createFail:createAction('[Document] Create Fail',props<{error:string}>()),

  delete:createAction('[Document] Delete',props<{id:string}>()),
  deleteSuccess:createAction('[Document] Delete Success',props<{doc:DocModel}>()),
  deleteFail:createAction('[Document] Delete Fail',props<{error:string}>()),

  update:createAction('[Document] Update',props<{id:string,uid:string|undefined,updateField:string,updateValue:any}>()),
  updateSuccess:createAction('[Document] Update Success',props<{doc:DocModel,updateField:string,updateValue:any}>()),
  updateFail:createAction('[Document] Update Fail',props<{error:string}>()),

  getUserInDoc:createAction('[Document] Get User In Doc',props<{id:string}>()),
  getUserInDocSuccess:createAction('[Document] Get User In Doc Success',props<{users:any[]}>()),
  getUserInDocFail:createAction('[Document] Get User In Doc Fail',props<{error:string}>()),
}
