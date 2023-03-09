import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { switchMap } from "rxjs";
import { UserAction } from "../actions/user.action";


@Injectable()
export class userEffect {
  constructor(private actions$: Actions) { }

}
