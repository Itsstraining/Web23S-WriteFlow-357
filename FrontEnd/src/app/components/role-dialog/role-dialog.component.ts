import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
interface Option{
  value: string;
  viewValue: string;
  icon: any;
}
interface AccessOption {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss']
})
export class RoleDialogComponent {
  constructor(private matDialog:MatDialog){}
  openDialog(){
    this.matDialog.open(RoleDialogComponent,{
      
    })
  }
  options: Option[] = [
    {value: 'lock-1', icon:'lock', viewValue: 'Restricted'},
    {value: 'public-2', icon:'public' ,viewValue: 'Anyone with the link'}
  ];
  public selected2 = {value: 'lock-1', icon:'lock', viewValue: 'Restricted'};
  
  public accessoptions: AccessOption[] = [
    {value: '1', viewValue: 'Viewer'},
    {value: '2', viewValue: 'Editor'},  
  ];
  
  compareFn(f1: Option, f2: Option): boolean {
    return f1 && f2? f1.value === f2.value : f1 === f2;
  }
}
