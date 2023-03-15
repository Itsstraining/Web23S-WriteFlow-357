import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, } from "@ngrx/effects";
import { catchError, map, of, switchMap, pipe } from 'rxjs';
import { DocModel } from "src/app/models/doc.model";
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
  getDeleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentActions.getDeleted),
      switchMap(() => this.documentService.getDeleted().pipe(
        map((documents) => {
          return DocumentActions.getDeletedSuccess({ documents: documents })
        }),
        catchError((error) => {
          return of(DocumentActions.getDeletedFail({ error }))
        })
      )
      ),
    )
  )
  getShared$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentActions.getShared),
      switchMap(() => this.documentService.getShared().pipe(
        map((documents) => {
          return DocumentActions.getSharedSuccess({ documents: documents })
        }),
        catchError((error) => {
          return of(DocumentActions.getSharedFail({ error }))
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
  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentActions.get),
      switchMap((action) => this.documentService.getDoc(action.id).pipe(
        map((document) => {
          return DocumentActions.getSuccess({ document: document })
        }),
        catchError((error) => {
          return of(DocumentActions.getFail({ error }))
        })
      )
      ),
    )
  )



  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentActions.delete),
      switchMap((action) => this.documentService.delete(action.id).pipe(
        map((doc) => {
          return DocumentActions.deleteSuccess({ doc: doc })
        }),
        catchError((error) => {
          return of(DocumentActions.deleteFail({ error }))
        })
      )
      ),
    )
  )
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentActions.update),
      switchMap((action) => this.documentService.update(action.id, action.uid, action.updateField, action.updateValue).pipe(
        map((doc) => {
          return DocumentActions.updateSuccess({ doc: doc, updateField: action.updateField, updateValue: action.updateValue })
        }),
        catchError((error) => {
          return of(DocumentActions.updateFail({ error }))
        })
      )
      ),
    )
  )
  getUserInDoc$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentActions.getUserInDoc),
      switchMap((action) => this.documentService.getUserInDoc(action.id).pipe(
        map((users) => {
          return DocumentActions.getUserInDocSuccess({ users: users })
        }),
        catchError((error) => {
          return of(DocumentActions.getUserInDocFail({ error }))
        })
      )))
  )
}
