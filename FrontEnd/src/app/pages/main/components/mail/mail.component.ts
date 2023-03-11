import { environment } from './../../../../../environments/environment';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent {

  constructor(private http: HttpClient){}

  panelOpenState = false;
  reloadEmail(){
    location.reload();
  }

  getall()
  {
    return this.http.get(`${environment.apiURL}getall`);
  }
  // AcceptRequest()
  // {
  //   window.alert('You have accepted the invitation');
  // }

  // RejectRequest()
  // {
  //   window.alert('You have been denied the invitation');
  // }
}
