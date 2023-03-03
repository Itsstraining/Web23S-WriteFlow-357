import { Injectable } from '@angular/core';
import { Auth, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, User } from '@angular/fire/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Subject<User | null> = new Subject<User | null>();
  currentUser: User | null = null;
  isLoading$: Subject<boolean> = new Subject<boolean>();

  constructor(private auth: Auth) {
    this.currentUser = auth.currentUser;
    this.user$.next(this.currentUser);
    this.isLoading$.next(true);

    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
      this.user$.next(user);
      this.isLoading$.next(false);
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
