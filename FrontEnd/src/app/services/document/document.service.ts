import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocModel } from 'src/app/models/doc.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  url = '/document'
  constructor(private http: HttpClient, private authService: AuthService,) { }
  getAll(): Observable<any[]> {

    return this.http.get(`${environment.apiURL}${this.url}?uid=${this.authService.currentUser?.uid}`, {
      headers: {
        'authorization': this.authService.getToken(),
      }
    }) as Observable<any[]>
  }

  create(doc: DocModel): Observable<any> {
    return this.http.post(environment.apiURL + this.url + "/createDoc",
      {
        document: doc,
      },
      {
        headers: {
          'authorization': this.authService.getToken(),
        }
      }) as Observable<any>
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.apiURL}${this.url}?id=${id}`, {
      headers: {
        'authorization': this.authService.getToken(),
      }
    }) as Observable<any>
  }
}
