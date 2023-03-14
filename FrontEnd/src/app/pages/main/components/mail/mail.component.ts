import { environment } from './../../../../../environments/environment';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MailState } from 'src/ngrx/states/mail.state';
import { Store } from '@ngrx/store';
import { MailActions } from 'src/ngrx/actions/mail.action';
import { AuthService } from 'src/app/services/auth.service';
import { SharedFunctionService } from 'src/app/services/shared-function/shared-function.service';
@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent {

  constructor(private http: HttpClient,
    private store: Store<{ mail:MailState }>,
    private authService:AuthService,
    public shareFunction:SharedFunctionService
    ){}
  store$ = this.store.select('mail');
  panelOpenState = false;
  reloadEmail(){
    location.reload();
  }
  ngOnInit(): void {
    this.store.dispatch(MailActions.getAllMails({uid:this.authService.currentUser?.uid}))
  }
  acceptInvite(id:string,right:string,docId:string){
    this.store.dispatch(MailActions.acceptInvite({id:id,right:right,docId:docId,uid:this.authService.currentUser?.uid}))
  }
  declineInvite(id:string,right:string,docId:string){
    this.store.dispatch(MailActions.declineInvite({id:id,right:'decline',docId:docId,uid:this.authService.currentUser?.uid}))
  }

}
