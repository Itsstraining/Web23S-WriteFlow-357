import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { config, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SharedFunctionService } from 'src/app/services/shared-function/shared-function.service';
import { DocumentActions } from 'src/ngrx/actions/document.action';
import { DocumentState } from 'src/ngrx/states/document.state';
import { CreateDocumentComponent } from '../create-document/create-document.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
doc$=this.store.select('doc');
store$=this.store.select('doc');
inProgress=false;
constructor(private activateRoute:ActivatedRoute
  ,private authService:AuthService,private store:Store<{doc:DocumentState}>,
  private dialogService:MatDialog,
  public shareFunctionService:SharedFunctionService,

  private router:Router) {
 }
 ngOnInit(): void {
  this.authService.user$.subscribe((data)=>{
    if(data!=null){
      this.store.dispatch(DocumentActions.getAll());
    }
  })

 }
 openCreateDialog(){
  this.dialogService.open(CreateDocumentComponent,{
  });
 }
 navigateToDoc(id:string){
  this.router.navigate(['main/document/edit'],{queryParams:{id:id}})

 }
 deleteDoc(id:string) {
  if (this.inProgress == true) return;
  let tempSub: Subscription = this.store$.subscribe((data) => {
    if (this.inProgress == true && data.inProcess == false) {
      if (data.error == '') {
        try {

          tempSub.unsubscribe();
          this.inProgress = false;

        } catch (err) { }
      } else {
        this.inProgress = false;
      }
    } else {
      this.inProgress = data.inProcess;
    }
  })
  this.store.dispatch(DocumentActions.delete({ id:id }));
}
}
