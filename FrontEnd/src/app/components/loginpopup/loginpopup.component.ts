import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginpopup',
  templateUrl: './loginpopup.component.html',
  styleUrls: ['./loginpopup.component.scss']
})
export class LoginpopupComponent {

 emailFormControl = new FormControl('', [Validators.required, Validators.email]);
 hide = true;
}
