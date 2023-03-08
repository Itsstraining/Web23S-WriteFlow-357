import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { config } from 'rxjs';
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
constructor(private activateRoute:ActivatedRoute
  ,private authService:AuthService,private store:Store<{doc:DocumentState}>,
  private dialogService:MatDialog,
  public shareFunctionService:SharedFunctionService,
  private router:Router) {

  // this.activateRoute.paramMap.subscribe((params)=>{
  //   console.log(params.get('type'));
  // })
 }
 ngOnInit(): void {
  this.authService.user$.subscribe((data)=>{
    if(data!=null){

      this.store.dispatch(DocumentActions.getAll());
      // this.doc$.subscribe((data=>{
      //   console.log(data);
      // }))
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
}
