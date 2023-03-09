import { Component } from '@angular/core';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent {

  constructor(){}

  panelOpenState = false;
  reloadEmail(){
    location.reload();
  }

  AcceptRequest()
  {
    window.alert('You have accepted the invitation');
  }

  RejectRequest()
  {
    window.alert('You have been denied the invitation');
  }
}
