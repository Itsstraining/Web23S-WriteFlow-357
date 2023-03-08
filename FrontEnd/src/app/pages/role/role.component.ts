import { Component } from '@angular/core';

interface Option{
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
 
  options: Option[] = [
    {value: 'lock-1', icon:'lock', viewValue: 'Restricted'},
    {value: 'public-2', icon:'public' ,viewValue: 'Anyone with the link'}
  ];
  public selected2 = {value: 'lock-1', icon:'lock', viewValue: 'Restricted'};

  compareFn(f1: Option, f2: Option): boolean {
    return f1 && f2? f1.value === f2.value : f1 === f2;
  }
}
