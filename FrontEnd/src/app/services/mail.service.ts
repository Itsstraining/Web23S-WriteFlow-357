import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MailModel } from 'src/models/mail.model';
import { MailDocModel } from '../models/doc.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  apiUrl: string = `${environment.apiURL}/mail`;
  constructor(private http:HttpClient,private authService:AuthService) { }

  getAll(){
    return this.http.get(`${environment.apiURL}?uid=${this.authService.currentUser?.uid}`, {
      headers: {
        'authorization': this.authService.getToken(),
      }
    }) as Observable<MailModel[]>
  }
  //senderId:string,sentTo:string,doc:MailDocModel,right:string
  createInvite(senderId:string,sentTo:string,doc:MailDocModel,right:string){
    return this.http.post(`${environment.apiURL}/invite`,{
     senderId:senderId,
      sentTo:sentTo,
      doc:doc,
      right:'canEdit'
    }, {
      headers: {
        'authorization': this.authService.getToken(),
      }
    }) as Observable<MailModel>
  }
     //docId:string,right:string,uid:string,id:string
  acceptInvite(docId:string,uid:string,id:string){
    return this.http.put(`${environment.apiURL}/accept`,{
      docId:docId,
      right:'accept',
      uid:uid,
      id:id,
     }, {
       headers: {
         'authorization': this.authService.getToken(),
       }
     }) as Observable<MailModel>
  }

  declineInvite(id:string,uid:string){
    return this.http.put(`${environment.apiURL}/decline`,{
      uid:uid,
      id:id,
     }, {
       headers: {
         'authorization': this.authService.getToken(),
       }
     }) as Observable<MailModel>
  }
}
