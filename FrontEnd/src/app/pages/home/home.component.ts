import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router, private authService: AuthService) { }

  user: User | null = null;

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.router.navigate(['/main']);
      }
    });

    if (this.user) {
      this.router.navigate(['/main']);
    }
  }
}
