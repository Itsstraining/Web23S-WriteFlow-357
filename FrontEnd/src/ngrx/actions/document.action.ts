import { createAction, props } from "@ngrx/store";
import { DocModel } from "src/app/models/doc.model";


export const DocumentActions={
  getAll:createAction('[Document] Get All'),
  getAllSuccess:createAction('[Document] Get All Success',props<{documents:DocModel[]}>()),
  getAllFail:createAction('[Document] Get All Fail',props<{error:string}>()),

  create:createAction('[Document] Create',props<{document:DocModel}>()),
  createSuccess:createAction('[Document] Create Success',props<{document:DocModel}>()),
  createFail:createAction('[Document] Create Fail',props<{error:string}>()),

  delete:createAction('[Document] Delete',props<{id:string}>()),
  deleteSuccess:createAction('[Document] Delete Success',props<{id:string}>()),
  deleteFail:createAction('[Document] Delete Fail',props<{error:string}>()),

  update:createAction('[Document] Update',props<{document:DocModel}>()),
  updateSuccess:createAction('[Document] Update Success',props<{document:DocModel}>()),
  updateFail:createAction('[Document] Update Fail',props<{error:string}>()),
}
