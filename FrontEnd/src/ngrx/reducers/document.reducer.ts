import { createReducer, on } from "@ngrx/store";
import { DocumentActions } from "../actions/document.action";
import { DocumentState } from "../states/document.state";

let initialState:DocumentState = {
  documents: null,
  document: null,
  loading: false,
  inProcess: false,
  error: ''
}
export const DocumentReducer = createReducer(
  initialState,
  on(DocumentActions.getAll, ((state) => {
    return {
      ...state,
      documents:null,
      loading: true,
      error: ''
      }
    })
  ),
  on(DocumentActions.getAllSuccess,((state,{documents}) => {
    return {
      ...state,
      documents:documents,
      loading: false
      }
    })
  ),
  on(DocumentActions.getAllFail, ((state,{error}) => {
    return {
      ...state,
      documents:null,
      loading: true,
      error:error
      }
    })
  ),
)
