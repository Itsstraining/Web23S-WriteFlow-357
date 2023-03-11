import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocModel } from 'src/app/models/doc.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentService } from 'src/app/services/document/document.service';
import { UserService } from 'src/app/services/user/user.service';
import { lastValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditBioComponent } from './components/edit-bio/edit-bio.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(
    private userService: UserService,
    private documentService: DocumentService,
    private activateRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  user: UserModel = {
    uid: '',
    email: '',
    bio: '',
    job: [],
    displayName: '',
    photoURL: '',
    starDocuments: [],
    following: [],
    followers: [],
  };

  documents: DocModel[] = [];

  ngOnInit() {
    let id = this.activateRoute.snapshot.params['id'];
    this.initializeUser(id);
    this.initializeUserDocuments(id);
  }

  async initializeUser(id: string) {
    this.user = <any>(await this.userService.getUser(id));
  }

  async initializeUserDocuments(uid: string) {
    this.documents = <any>(await this.documentService.getPublicDocs(uid));
    console.log(this.documents);
  }

  openEditBio() {
    const dialogRef = this.dialog.open(EditBioComponent, {
      width: '500px',
      data: { bio: this.user.bio }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Object.assign(this.user, result);
        console.log(this.user);
        this.userService.updateUser(this.user).then((res) => {
          Object.assign(this.user, res);
        });
      }
    });
  }

  openEditJob() {
    const dialogRef = this.dialog.open(EditJobComponent, {
      width: '500px',
      data: { job: this.user.job }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Object.assign(this.user, result);
        console.log(result);
        this.userService.updateUser(this.user).then((res) => {
          Object.assign(this.user, res);
        });;
      }
    });
  }

}
