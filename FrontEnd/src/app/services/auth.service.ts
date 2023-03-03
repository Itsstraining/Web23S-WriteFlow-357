import { Injectable } from '@angular/core';
import { Auth, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, User } from '@angular/fire/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Subject<User | null> = new Subject<User | null>();
  currentUser: User | null = null;

  constructor(private auth: Auth) {
    this.currentUser = auth.currentUser;

    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
      this.user$.next(user);
    });
  }

  loginWithGoogle() {
    let provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider);
  }

  loginWithFacebook() {
    let provider = new FacebookAuthProvider();
    signInWithPopup(this.auth, provider);
  }

  logout() {
    this.auth.signOut();
  }
}
