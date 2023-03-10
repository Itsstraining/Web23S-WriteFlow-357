import { createReducer, on } from "@ngrx/store";
import { UserAction } from "../actions/user.action";
import { UserState } from "../states/user.state";

const initialState: UserState = {
  user: null,
  users: null,
  loading: false,
  error: null,
  inProcess: false

}
export const UserReducer = createReducer(
  initialState,
  on(UserAction.register, (state) => {
    return {
      ...state,
      inProcess: true,
      error: null
    }
  }),
  on(UserAction.registerSuccess, (state) => {
    return {
      ...state,
      inProcess: false,
    }
  }),
  on(UserAction.registerFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      error: error
    }
  }),
  on(UserAction.get, (state) => {
    return {
      ...state,
      loading: true,
      error: null
    }
  }),
  on(UserAction.getSuccess, (state, { user }) => {
    return {
      ...state,
      loading: false,
      user: user
    }
  }),
  on(UserAction.getFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error
    }
  }),
  on(UserAction.getAll, (state) => {
    return {
      ...state,
      loading: true,
      error: null
    }
  }),
  on(UserAction.getAllSuccess, (state, { users }) => {
    return {
      ...state,
      loading: false,
      users: users
    }
  }),
  on(UserAction.getAllFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error
    }
  }),



)
