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
  getAll(): Observable<DocModel[]> {

    return this.http.get(`${environment.apiURL}${this.url}?uid=${this.authService.currentUser?.uid}`, {
      headers: {
        'authorization': this.authService.getToken(),
      }
    }) as Observable<DocModel[]>
  }
  getDeleted(): Observable<DocModel[]> {
    return this.http.get(`${environment.apiURL}${this.url}/deleted?uid=${this.authService.currentUser?.uid}`, {
      headers: {
        'authorization': this.authService.getToken(),
      }
    }) as Observable<DocModel[]>
  }
  getShared(): Observable<DocModel[]> {
    return this.http.get(`${environment.apiURL}${this.url}/shared?uid=${this.authService.currentUser?.uid}`, {
      headers: {
        'authorization': this.authService.getToken(),
      }
    }) as Observable<DocModel[]>
  }

  create(doc: DocModel): Observable<DocModel> {
    return this.http.post(environment.apiURL + this.url + "/createDoc",
      {
        document: doc,
      },
      {
        headers: {
          'authorization': this.authService.getToken(),
        }
      }) as Observable<DocModel>
  }
  delete(id: string): Observable<DocModel> {
    return this.http.delete(`${environment.apiURL}${this.url}?id=${id}`, {
      headers: {
        'authorization': this.authService.getToken(),
      }
    }) as Observable<DocModel>
  }
}
