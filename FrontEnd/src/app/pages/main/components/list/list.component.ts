import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
constructor(private activateRoute:ActivatedRoute) {
  this.activateRoute.paramMap.subscribe((params)=>{
    console.log(params.get('type'));
  })
 }
}
