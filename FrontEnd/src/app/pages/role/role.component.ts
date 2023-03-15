import { RoleDialogComponent } from 'src/app/pages/main/components/role-dialog/role-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

interface Option {
  value: string;
  viewValue: string;
  icon: any;
}

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {

  constructor(private matDialog: MatDialog) { }
  openDialog() {
    this.matDialog.open(RoleDialogComponent, {
      height: '32.5rem',
      width: '44rem',
      panelClass: 'custom-modalbox'

    })
  }
  options: Option[] = [
    { value: 'lock-1', icon: 'lock', viewValue: 'Restricted' },
    { value: 'public-2', icon: 'public', viewValue: 'Anyone with the link' }
  ];
  public selected2 = { value: 'lock-1', icon: 'lock', viewValue: 'Restricted' };

  compareFn(f1: Option, f2: Option): boolean {
    return f1 && f2 ? f1.value === f2.value : f1 === f2;
  }
}
