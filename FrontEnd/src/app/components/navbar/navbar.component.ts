import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isTop = true;

  constructor(private authService: AuthService) { }

  user$ = this.authService.user$;
  user: User | null = this.authService.currentUser;

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 0) {
        this.isTop = false;
      } else {
        this.isTop = true;
      }
    })

    this.user$.subscribe(user => {
      this.user = user;
    });
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

}
