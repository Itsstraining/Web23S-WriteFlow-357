import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MailModel } from 'src/models/mail.model';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  apiUrl: string = `${environment.apiURL}/mail`;
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll() {
    return this.http.get(`${this.apiUrl}/getall?uid=${this.authService.currentUser?.uid}`, {
      headers: {
        'authorization': this.authService.getToken(),
      }
    }) as Observable<any[]>
  }
  //senderId:string,sentTo:string,doc:MailDocModel,right:string
  createInvite(senderId: string|undefined, sentTo: string, docId: string, right: string) {
    return this.http.post(`${this.apiUrl}/invite`, {
      sender: senderId,
      sentTo: sentTo,
      docId: docId,
      right: right,
    }, {
      headers: {
        'authorization': this.authService.getToken(),
      }
    }) as Observable<MailModel>
  }
  //docId:string,right:string,uid:string,id:string
  acceptInvite(docId: string, uid: string|undefined, id: string) {
    return this.http.put(`${this.apiUrl}/accept`, {
      docId: docId,
      right: 'accept',
      uid: uid,
      id: id,
    }, {
      headers: {
        'authorization': this.authService.getToken(),
      }
    }) as Observable<MailModel>
  }

  declineInvite(docId: string, uid: string|undefined, id: string) {
    return this.http.put(`${this.apiUrl}/decline`, {
      docId: docId,
      right: 'decline',
      uid: uid,
      id: id,
    }, {
      headers: {
        'authorization': this.authService.getToken(),
      }
    }) as Observable<MailModel>
  }
}
