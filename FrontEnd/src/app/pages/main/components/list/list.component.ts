import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentActions } from 'src/ngrx/actions/document.action';
import { DocumentState } from 'src/ngrx/states/document.state';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
doc$=this.store.select('doc');
constructor(private activateRoute:ActivatedRoute,private authService:AuthService,private store:Store<{doc:DocumentState}>) {

  // this.activateRoute.paramMap.subscribe((params)=>{
  //   console.log(params.get('type'));
  // })
 }
 ngOnInit(): void {
  this.authService.user$.subscribe((data)=>{
    if(data!=null){

      this.store.dispatch(DocumentActions.getAll());
      this.doc$.subscribe((data=>{
        console.log(data);
      }))
    }
  })

 }
}
