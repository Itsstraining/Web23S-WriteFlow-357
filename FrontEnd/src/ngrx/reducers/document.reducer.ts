import { createReducer, on } from "@ngrx/store";
import { DocumentActions } from "../actions/document.action";
import { DocumentState } from "../states/document.state";

let initialState: DocumentState = {
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
      documents: null,
      loading: true,
      error: ''
    }
  })),
  on(DocumentActions.getAllSuccess, ((state, { documents }) => {
    return {
      ...state,
      documents: documents,
      loading: false
    }
  })),
  on(DocumentActions.getAllFail, ((state, { error }) => {
    return {
      ...state,
      documents: null,
      loading: false,
      error: error
    }
  })),
  on(DocumentActions.create, ((state) => {
    return {
      ...state,
      document: null,
      inProcess: true,
      error: ''
    }
  })),
  on(DocumentActions.createSuccess, ((state, { document }) => {
    let documents = [...state.documents!]
    documents.push(document);
    return {
      ...state,
      documents: documents,
      inProcess: false
    }
  })),
  on(DocumentActions.createFail, ((state, { error }) => {
    return {
      ...state,
      document: null,
      inProcess: false,
      error: error
    }
  })),
  on(DocumentActions.delete, ((state) => {
    return {
      ...state,
      inProcess: true,
      error: ''
    }
  })),
  on(DocumentActions.deleteSuccess, ((state, { id }) => {
    let documents = [...state.documents!]
    let index = documents.findIndex(x => x.id == id);
    documents.splice(index, 1);
    return {
      ...state,
      documents: documents,
      inProcess: false
    }
  })),
  on(DocumentActions.deleteFail, ((state, { error }) => {
    return {
      ...state,
      inProcess: false,
      error: error
    }
  })),
)