import { createAction, props } from "@ngrx/store";

import { UserModel } from "src/app/models/user.model";
import { MailModel } from "src/models/mail.model";




export const MailActions={
  getAllMails: createAction('[Mail] Get All Mails',props<{uid:string|undefined}>()),
  getAllMailsSuccess: createAction('[Mail] Get All Mails Success',props<{mails:any[]}>()),
  getAllMailsFailure: createAction('[Mail] Get All Mails Failure',props<{error:any}>()),

  createInvite: createAction('[Mail] Create Invite',props<{senderId:string|undefined,sentTo:string,docId:string,right:string}>()),
  createInviteSuccess: createAction('[Mail] Create Invite Success',props<{mail:MailModel}>()),
  createInviteFailure: createAction('[Mail] Create Invite Failure',props<{error:any}>()),

  acceptInvite: createAction('[Mail] Accept Invite',props<{docId:string,right:string,uid:string|undefined,id:string}>()),
  acceptInviteSuccess: createAction('[Mail] Accept Invite Success',props<{mail:MailModel}>()),
  acceptInviteFailure: createAction('[Mail] Accept Invite Failure',props<{error:any}>()),

  declineInvite: createAction('[Mail] Decline Invite',props<{docId:string,right:string,uid:string|undefined,id:string}>()),
  declineInviteSuccess: createAction('[Mail] Decline Invite Success',props<{mail:MailModel}>()),
  declineInviteFailure: createAction('[Mail] Decline Invite Failure',props<{error:any}>()),


}
