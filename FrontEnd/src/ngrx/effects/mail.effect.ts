import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { MailService } from "src/app/services/mail.service";
import { MailActions } from "../actions/mail.action";


@Injectable()
export class MailEffect {
  constructor(private actions$: Actions,private mailService:MailService)  {
  }
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MailActions.getAllMails),
      switchMap(() => this.mailService.getAll().pipe(
        map((mails) => {
          return MailActions.getAllMailsSuccess({ mails: mails })
        }),
        catchError((error) => {
          return of(MailActions.getAllMailsFailure({ error }))
        })
       )
      ),
    )
  )
  createInvite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MailActions.createInvite),
      switchMap((action) => this.mailService.createInvite(action.senderId,action.sentTo,action.docId,action.right).pipe(
        map((mail) => {
          return MailActions.createInviteSuccess({ mail: mail })
        }),
        catchError((error) => {
          return of(MailActions.createInviteFailure({ error }))
        })
       )
      ),
    )
  )
  acceptInvite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MailActions.acceptInvite),
      switchMap((action) => this.mailService.acceptInvite(action.docId,action.uid,action.id).pipe(
        map((mail) => {
          return MailActions.acceptInviteSuccess({mail:mail})
        }),
        catchError((error) => {
          return of(MailActions.acceptInviteFailure({ error }))
        })
       )
      ),
    )
  )
  declineInvite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MailActions.declineInvite),
      switchMap((action) => this.mailService.declineInvite(action.docId,action.uid,action.id).pipe(
        map((mail) => {
          return MailActions.declineInviteSuccess({ mail: mail })
        }),
        catchError((error) => {
          return of(MailActions.declineInviteFailure({ error }))
        })
       )
      ),
    )
  )
}
