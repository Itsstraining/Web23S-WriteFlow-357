import { createReducer, on } from "@ngrx/store";
import { MailActions } from "../actions/mail.action";
import { MailState } from "../states/mail.state";

const initialState:MailState = {
  mails:null,
  loading:false,
  inProcess:false,
  error:null
}
export const mailReducer = createReducer(
  initialState,
  on(MailActions.getAllMails,(state)=>({...state,loading:true,mails:null})),
  on(MailActions.getAllMailsSuccess,(state,action)=>({...state,loading:false,mails:action.mails})),
  on(MailActions.getAllMailsFailure,(state,action)=>({...state,loading:false,error:action.error})),
  on(MailActions.createInvite,(state)=>({...state,inProcess:true})),
  on(MailActions.createInviteSuccess,(state,action)=>({...state,inProcess:false})),
  on(MailActions.createInviteFailure,(state,action)=>({...state,inProcess:false,error:action.error})),
  on(MailActions.acceptInvite,(state)=>({...state,inProcess:true})),
  on(MailActions.acceptInviteSuccess,(state,action)=>({...state,inProcess:false,mails:state.mails!.filter(mail=>mail.id!==action.mail.id)})),
  on(MailActions.acceptInviteFailure,(state,action)=>({...state,inProcess:false,error:action.error})),
  on(MailActions.declineInvite,(state)=>({...state,inProcess:true})),
  on(MailActions.declineInviteSuccess,(state,action)=>({...state,inProcess:false,mails:state.mails!.filter(mail=>mail.id!==action.mail.id)})),
  on(MailActions.declineInviteFailure,(state,action)=>({...state,inProcess:false,error:action.error})),

)
