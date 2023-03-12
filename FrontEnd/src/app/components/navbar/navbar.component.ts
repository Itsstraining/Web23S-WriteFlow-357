import { LoginpopupComponent } from '../../components/loginpopup/loginpopup.component';
import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isTop = true;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) { }

  user$ = this.authService.user$;
  user: User | null = null;
  userPhoto: string | '' = '';
  isLoading = true;

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 0) {
        this.isTop = false;
      } else {
        this.isTop = true;
      }
    })

    this.user = this.authService.currentUser;
    this.isLoading = this.authService.isLoading;
    this.userPhoto = this.authService.photoURL || '';

    if (this.user) {
      this.isLoading = false;
    }

    this.user$.subscribe(user => {
      this.user = user;
      this.updatePhotoURL(user);
    });

    this.authService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    this.updatePhotoURL(this.user);
  }

  updatePhotoURL(user: any) {
    if (!this.user) return;
    this.userService.getUser(this.user.uid).then((res: any) => {
      this.userPhoto = res.photoURL;
    })
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  loginWithFacebook() {
    this.authService.loginWithFacebook();
  }

  logout() {
    this.authService.logout();
  }

  openDialogLogin() {
    const dialogRef = this.dialog.open(LoginpopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
