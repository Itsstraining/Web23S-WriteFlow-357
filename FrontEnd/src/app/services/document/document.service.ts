import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  url='/document'
  constructor(private http:HttpClient) { }
  getAll():Observable<any[]>{
    return this.http.get(environment.apiURL+this.url) as Observable<any[]>

  }
}
