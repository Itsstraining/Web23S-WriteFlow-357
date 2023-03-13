import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { config, Subject, Subscription, take } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SharedFunctionService } from 'src/app/services/shared-function/shared-function.service';
import { DocumentActions } from 'src/ngrx/actions/document.action';
import { DocumentState } from 'src/ngrx/states/document.state';
import { CreateDocumentComponent } from '../create-document/create-document.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  doc$ = this.store.select('doc');
  store$ = this.store.select('doc');
  inProgress = false;
  tempSub!: Subscription;

  constructor(
    private activateRoute: ActivatedRoute,
    private authService: AuthService, private store: Store<{ doc: DocumentState }>,
    private dialogService: MatDialog,
    public shareFunctionService: SharedFunctionService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.tempSub = this.activateRoute.url.subscribe(async (path) => {

      if (this.authService.auth.currentUser == null) return;
      switch (path[1].path) {
        case 'owned':
          this.store.dispatch(DocumentActions.getAll());
          break;
        case 'bin':
          this.store.dispatch(DocumentActions.getDeleted());
          break;
        case 'shared':
          this.store.dispatch(DocumentActions.getShared());
          break;
      }
    })
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    try {
      this.tempSub.unsubscribe();
    }
    catch (err) { }
  }

  openCreateDialog() {
    this.dialogService.open(CreateDocumentComponent, {});
  }

  navigateToDoc(id: string) {
    this.router.navigate(['main/document/edit'], { queryParams: { id: id } })
  }

  openDeleteDialog() { }

  changeDocDeleted(id: string, status: boolean) {
    if (this.inProgress == true) return;
    let tempSub: Subscription = this.store$.subscribe((data) => {
      if (this.inProgress || !data.inProcess) {
        this.inProgress = data.inProcess;
        return;
      }

      if (data.error) {
        this.inProgress = false;
        return;
        //this._snackBar.open('Document has been move to Recycle bin', 'Close');
      }

      try {
        tempSub.unsubscribe();
        this.inProgress = false;
        this._snackBar.open('Document has been move to Recycle bin', 'Close');
      } catch (err) {
        this._snackBar.open('Document has been move to Recycle bin', 'Close');
      }
    })

    this.store.dispatch(DocumentActions.update({ id: id, uid: this.authService.auth.currentUser?.uid, updateField: 'isDelete', updateValue: status }));
  }
}
