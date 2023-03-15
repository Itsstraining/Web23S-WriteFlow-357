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
    private store: Store<{ mail: MailState }>,
    private authService: AuthService,
    public shareFunction: SharedFunctionService
  ) { }
  acceptMails: Array<any> = [];
  declineMails: Array<any> = [];
  inviteMails: Array<any> = [];
  allMails: Array<any> = [];
  filteredMail: Array<any> = [];
  activeFilter: string = 'all';
  startNumber: number = 0;
  endNumber: number = 10;
  totalPage: number = 0;
  store$ = this.store.select('mail');
  panelOpenState = false;

  reloadEmail() {
    this.store.dispatch(MailActions.getAllMails({ uid: this.authService.currentUser?.uid }))
  }

  ngOnInit(): void {
    this.store.dispatch(MailActions.getAllMails({ uid: this.authService.currentUser?.uid }))
    this.store$.subscribe((data) => {
      if (data.mails) {

        this.allMails = data.mails;
        this.filteredMail = [...data.mails].sort((a: any, b: any) => parseInt(b.date) - parseInt(a.date));
        this.acceptMails = data.mails.filter((mail: any) => mail.right === 'accept').sort((a: any, b: any) => parseInt(b.date) - parseInt(a.date));
        this.declineMails = data.mails.filter((mail: any) => mail.right === 'decline').sort((a: any, b: any) => parseInt(b.date) - parseInt(a.date));
        this.inviteMails = data.mails.filter((mail: any) => mail.type === 'invite').sort((a: any, b: any) => parseInt(b.date) - parseInt(a.date));

      }
    })
  }


  acceptInvite(id: string, right: string, docId: string) {
    this.store.dispatch(MailActions.acceptInvite({ id: id, right: right, docId: docId, uid: this.authService.currentUser?.uid }))
  }

  declineInvite(id: string, right: string, docId: string) {
    this.store.dispatch(MailActions.declineInvite({ id: id, right: 'decline', docId: docId, uid: this.authService.currentUser?.uid }))
  }
  changeMailType(type: string) {
    switch (type) {
      case 'accept':
        this.activeFilter = 'accept';
        this.filteredMail = this.acceptMails;
        break;
      case 'decline':
        this.activeFilter = 'decline';
        this.filteredMail = this.declineMails;
        break;
      case 'invite':
        this.activeFilter = 'invite';
        this.filteredMail = this.inviteMails;
        break;
      case 'all':
        this.activeFilter = 'all';
        this.filteredMail = this.allMails;

    }
    this.startNumber = 0;
    this.endNumber = 10;

  }
  searchMail(event: any) {

    this.filteredMail = this.allMails.filter((mail: any) => mail.sender.displayName.toLowerCase().includes(event.target.value.toLowerCase()) || mail.doc.name.toLowerCase().includes(event.target.value.toLowerCase()));
  }
  changePage(event: any) {
    if(event==='increase'){
      if(this.startNumber+10 >= this.filteredMail.length){
        return;
      }
    this.startNumber+=10
    if(this.filteredMail.length /this.endNumber>=1){
      this.endNumber+=10
    }else{
      this.endNumber += this.filteredMail.length %10
    }
  }else{

    if(this.startNumber-10 < 0){
      return;
    }
    this.startNumber-=10;
    if(this.filteredMail.length /this.endNumber>=1){
      this.endNumber-=10
    }else{
      this.endNumber -= this.filteredMail.length %10
    }
  }

  }

}
