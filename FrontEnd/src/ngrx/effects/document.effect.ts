import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, } from "@ngrx/effects";
import { catchError, map, of, switchMap, pipe } from 'rxjs';
import { DocumentService } from "src/app/services/document/document.service";
import { DocumentActions } from "../actions/document.action";
@Injectable()
export class DocumentEffects {
  constructor(private actions$: Actions, private documentService: DocumentService) { }
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentActions.getAll),
      switchMap(() => this.documentService.getAll().pipe(
        map((documents) => {
          return DocumentActions.getAllSuccess({ documents: documents })
        }),
        catchError((error) => {
          return of(DocumentActions.getAllFail({ error }))
        })
       )
      ),

    )
  )
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentActions.create),
      switchMap((action) => this.documentService.create(action.document).pipe(
        map((document) => {
          return DocumentActions.createSuccess({ document: document })
        }),
        catchError((error) => {
          return of(DocumentActions.createFail({ error }))
        })
       )
      ),

    )
  )

}
