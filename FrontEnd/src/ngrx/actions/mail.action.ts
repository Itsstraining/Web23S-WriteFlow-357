import { createAction, props } from "@ngrx/store";
import { MailDocModel } from "src/app/models/doc.model";
import { UserModel } from "src/app/models/user.model";
import { MailModel } from "src/models/mail.model";




export const MailActions={
  getAllMails: createAction('[Mail] Get All Mails'),
  getAllMailsSuccess: createAction('[Mail] Get All Mails Success',props<{mails:MailModel[]}>()),
  getAllMailsFailure: createAction('[Mail] Get All Mails Failure',props<{error:any}>()),

  createInvite: createAction('[Mail] Create Invite',props<{senderId:string,sentTo:string,doc:MailDocModel,right:string}>()),
  createInviteSuccess: createAction('[Mail] Create Invite Success',props<{mail:MailModel}>()),
  createInviteFailure: createAction('[Mail] Create Invite Failure',props<{error:any}>()),

  acceptInvite: createAction('[Mail] Accept Invite',props<{docId:string,right:string,uid:string,id:string}>()),
  acceptInviteSuccess: createAction('[Mail] Accept Invite Success',props<{mail:MailModel}>()),
  acceptInviteFailure: createAction('[Mail] Accept Invite Failure',props<{error:any}>()),

  declineInvite: createAction('[Mail] Decline Invite',props<{uid:string,id:string}>()),
  declineInviteSuccess: createAction('[Mail] Decline Invite Success',props<{mail:MailModel}>()),
  declineInviteFailure: createAction('[Mail] Decline Invite Failure',props<{error:any}>()),


}
