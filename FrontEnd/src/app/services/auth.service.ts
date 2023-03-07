import { Injectable } from '@angular/core';
import { Auth, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, User } from '@angular/fire/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Subject<User | null> = new Subject<User | null>();
  userToken: string = "";
  currentUser: User | null = null;
  isLoading$: Subject<boolean> = new Subject<boolean>();

  constructor(private auth: Auth) {
    this.currentUser = auth.currentUser;
    this.user$.next(this.currentUser);
    this.isLoading$.next(true);

    onAuthStateChanged(auth, async (user) => {
      if (user!=null) {
        this.userToken = await user.getIdToken();
        this.currentUser = user;
        this.user$.next(user);

        this.isLoading$.next(false);
      } else {
        this.currentUser = null;
        this.user$.next(null);

        this.isLoading$.next(false);
      }
    })

  }

  async loginWithGoogle() {
    let provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
  }

  loginWithFacebook() {
    let provider = new FacebookAuthProvider();
    signInWithPopup(this.auth, provider);
  }

  logout() {
    this.auth.signOut();
  }
   getToken() {

    return this.userToken;
  }
}
