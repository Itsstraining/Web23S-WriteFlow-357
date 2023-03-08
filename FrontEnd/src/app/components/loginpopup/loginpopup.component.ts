import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-loginpopup',
  templateUrl: './loginpopup.component.html',
  styleUrls: ['./loginpopup.component.scss']
})
export class LoginpopupComponent {
  constructor(private authService: AuthService,private dialogRef: MatDialogRef<LoginpopupComponent>) {

  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  async loginWithGG() {
    try {
      await this.authService.loginWithGoogle();
      this.closeDialog();
    } catch (error) {

    }
  }
  closeDialog(){
    this.dialogRef.close();

  }
}
