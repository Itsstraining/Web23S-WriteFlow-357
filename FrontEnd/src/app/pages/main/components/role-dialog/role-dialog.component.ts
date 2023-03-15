import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { MailActions } from 'src/ngrx/actions/mail.action';
import { MailState } from 'src/ngrx/states/mail.state';
import { ErrorStateMatcher } from '@angular/material/core';
import { DocumentState } from 'src/ngrx/states/document.state';
import { DocumentActions } from 'src/ngrx/actions/document.action';

interface Option {
  value: string;
  viewValue: string;
  icon: any;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss']
})
export class RoleDialogComponent {
  constructor(private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: string,
    private store: Store<{ mail: MailState,doc:DocumentState }>,
    private authService: AuthService
  ) { }

  store$ = this.store.select('mail');
  doc$ = this.store.select('doc');
  defaultRole: string = 'canView'
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  options: Option[] = [
    { value: 'lock-1', icon: 'lock', viewValue: 'Restricted' },
    { value: 'public-2', icon: 'public', viewValue: 'Anyone with the link' }
  ];

  ngOnInit(): void {
    this.store.dispatch(DocumentActions.getUserInDoc({id:this.data}))
   }

  compareFn(f1: Option, f2: Option): boolean {
    return f1 && f2 ? f1.value === f2.value : f1 === f2;
  }

  changeRole(event: any) {
    this.defaultRole = event.value
  }

  invite() {
    if (this.emailFormControl.invalid) return;
    if (this.defaultRole == null) return;
    this.store.dispatch(MailActions.createInvite({ senderId: this.authService.currentUser?.uid, sentTo: this.emailFormControl.value!, docId: this.data, right: 'canEdit' }))
  }

  close() {
    this.matDialog.closeAll();
  }
}
