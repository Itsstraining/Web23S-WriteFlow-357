import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import {pipe} from 'rxjs';
import { DocumentActions } from "../actions/document.action";
@Injectable()
export class DocumentEffects {
  constructor(private actions$:Actions) {}
  getAll$=this.actions$.pipe(
    ofType(DocumentActions.getAll),
    switchMap(() => {
      return this.documentService.getAll().pipe(
        map((documents) => {
          return DocumentActions.getAllSuccess({documents})
        }),
        catchError((error) => {
          return of(DocumentActions.getAllFail({error}))
        })
      )
    })
  )

}
