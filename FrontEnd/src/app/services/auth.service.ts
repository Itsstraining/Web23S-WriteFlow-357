import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Subject<User | null> = new Subject<User | null>();
  userToken: string = "";
  currentUser: User | null = null;
  isLoading$: Subject<boolean> = new Subject<boolean>();
  isLoading: boolean = true;

  constructor(public auth: Auth, private router: Router, private http: HttpClient) {
    this.currentUser = auth.currentUser;
    this.user$.next(this.currentUser);
    this.isLoading$.next(true);

    onAuthStateChanged(auth, async (user) => {
      if (user != null) {
        this.userToken = await user.getIdToken();

        this.currentUser = user;
        this.user$.next(user);

        this.isLoading = false;
        this.isLoading$.next(false);
      } else {
        this.currentUser = null;
        this.user$.next(null);

        this.isLoading = false;
        this.isLoading$.next(false);
      }
    })

  }

  loginWithGoogle() {
    let provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider).then((result) => {
      this.http.post(`${environment.apiURL}/user/register`, result.user).subscribe();
    });
  }

  loginWithFacebook() {
    let provider = new FacebookAuthProvider();
    signInWithPopup(this.auth, provider);
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['home']);
    });
  }

  getToken() {
    return this.userToken;
  }
}
