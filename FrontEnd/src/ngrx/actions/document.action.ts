import { createAction, props } from "@ngrx/store";
import { DocModel } from "src/app/models/doc.model";


export const DocumentActions={
  getAll:createAction('[Document] Get All'),
  getAllSuccess:createAction('[Document] Get All Success',props<{documents:DocModel[]}>()),
  getAllFail:createAction('[Document] Get All Fail',props<{error:string}>()),

  create:createAction('[Document] Create',props<{document:DocModel}>()),
  createSuccess:createAction('[Document] Create Success',props<{document:DocModel}>()),
  createFail:createAction('[Document] Create Fail',props<{error:string}>()),
}
