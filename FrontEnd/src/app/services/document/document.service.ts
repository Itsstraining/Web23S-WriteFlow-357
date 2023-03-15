import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { last, lastValueFrom, map, Observable } from 'rxjs';
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

  getPublicDocs(uid: string) {
    return lastValueFrom(this.http.get(`${environment.apiURL}${this.url}/public?uid=${uid}`));
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

  getDoc(id: string): Observable<any> {
    return this.http.get(`${environment.apiURL}${this.url}?id=${id}`, {
      headers: new HttpHeaders({
        'authorization': this.authService.getToken(),
      })
    }) as Observable<any>
  }

  getFile(filename: string,id:string) {
    return this.http.get(`${environment.apiURL}${this.url}/file?id=${id}`, {
      headers: new HttpHeaders({
        'authorization': this.authService.getToken(),
        'filename': filename
      })
    })
  }

  async createFile() {
    let formData = new FormData();
    let file = new File(['{ "ops": []}'], 'file.json', { type: 'application/json' });
    formData.append('file', file);

    let filePath: any = await lastValueFrom(this.http.put(`${environment.apiURL}${this.url}/file`, formData, {
      headers: new HttpHeaders({
        'authorization': this.authService.getToken(),
        'ownerid': this.authService.currentUser?.uid!,
      }),
    }))

    return filePath;
  }

  async saveFile(content: any, filename: string) {
    let formData = new FormData();
    let file = new File([JSON.stringify(content)], 'file.json', { type: 'application/json' });
    formData.append('file', file);

    let response = await lastValueFrom(this.http.put(`${environment.apiURL}${this.url}/file`, formData, {
      headers: new HttpHeaders({
        'authorization': this.authService.getToken(),
        'ownerid': this.authService.currentUser?.uid!,
        'filename': filename
      })
    }))

    return response;
  }

  create(doc: DocModel): Observable<any> {
    return this.http.post(environment.apiURL + this.url + "/create",
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
  update(id: string, uid: string|undefined, updateField: string, updateValue: any): Observable<DocModel> {
    return this.http.put(`${environment.apiURL}${this.url}?uid=${uid}&id=${id}`, {
      updateField: updateField,
      updateValue: updateValue
    }, {
      headers: {
        'authorization': this.authService.getToken(),
      }
    }) as Observable<DocModel>
  }
  getUserInDoc(id: string): Observable<any> {
    return this.http.get(`${environment.apiURL}${this.url}/invite/?id=${id}&uid=${this.authService.currentUser?.uid}`, {
      headers: {
        'authorization': this.authService.getToken(),
      }
    }) as Observable<any>
  }
}
