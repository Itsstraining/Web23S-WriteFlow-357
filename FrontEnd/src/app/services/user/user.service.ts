import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private authService: AuthService, private http: HttpClient) { }

  url = 'http://localhost:3000/';

  getUser(uid: string) {
    return lastValueFrom(this.http.get(`${this.url}user?uid=${uid}`));
  }

  createUser(user: any): void {
    this.http.post(`${this.url}user/register`, user).subscribe((res) => {
      console.log(res);
    });
  }

  async updateUser(user: UserModel): Promise<Object> {
    console.log(user);

    let res = await lastValueFrom(this.http.put(`${this.url}user/update`, user, {
      headers: new HttpHeaders({
        'authorization': this.authService.getToken(),
        'ownerid': this.authService.currentUser?.uid!
      })
    }));

    return res;
  }

  async updateUserAvatar(image: any): Promise<Object> {
    let formData = new FormData();
    formData.append('file-avatar', image);

    let res = await lastValueFrom(this.http.put(`${this.url}user/upload-avatar`, formData, {
      headers: new HttpHeaders({
        'authorization': this.authService.getToken(),
        'ownerid': this.authService.currentUser?.uid!
      })
    }));

    return res;
  }

  async updateBannerAvatar(image: any): Promise<Object> {
    let formData = new FormData();
    formData.append('file-banner', image);

    let res = await lastValueFrom(this.http.put(`${this.url}user/upload-banner`, formData, {
      headers: new HttpHeaders({
        'authorization': this.authService.getToken(),
        'ownerid': this.authService.currentUser?.uid!
      })
    }));

    return res;
  }
}
