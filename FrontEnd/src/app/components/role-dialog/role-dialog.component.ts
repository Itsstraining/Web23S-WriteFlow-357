import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { MailActions } from 'src/ngrx/actions/mail.action';
import { MailState } from 'src/ngrx/states/mail.state';
interface Option {
  value: string;
  viewValue: string;
  icon: any;
}

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss']
})
export class RoleDialogComponent {
  store$ = this.store.select('mail');
  formData!: string;
  defaultRole:string='canView'
  constructor(private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: string,
    private store: Store<{ mail: MailState }>,
    private authService: AuthService
  ) { }

  openDialog() {
    this.matDialog.open(RoleDialogComponent, {

    })
  }
  ngOnInit(): void {
  }
  options: Option[] = [
    { value: 'lock-1', icon: 'lock', viewValue: 'Restricted' },
    { value: 'public-2', icon: 'public', viewValue: 'Anyone with the link' }
  ];
  public selected2 = { value: 'lock-1', icon: 'lock', viewValue: 'Restricted' };


  compareFn(f1: Option, f2: Option): boolean {
    return f1 && f2 ? f1.value === f2.value : f1 === f2;
  }
  changeRole(event: any) {
   this.defaultRole=event.value
  }
  invite() {
    if (this.formData.trim() == '') return;
    if(this.defaultRole==null) return;
    this.store.dispatch(MailActions.createInvite({ senderId: this.authService.currentUser?.uid, sentTo: this.formData, docId: this.data, right: 'canEdit' }))
  }

}
