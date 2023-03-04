import { Component } from '@angular/core';

interface Option{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {
  options: Option[] = [
    {value: 'v1', viewValue: 'Restricted'},
    {value: 'v2', viewValue: 'Anyone with the link'}
  ];
}
