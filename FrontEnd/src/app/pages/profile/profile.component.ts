import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocModel } from 'src/app/models/doc.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentService } from 'src/app/services/document/document.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditBioComponent } from './components/edit-bio/edit-bio.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { EditAvatarComponent } from './components/edit-avatar/edit-avatar.component';
import { ViewImageComponent } from './components/view-image/view-image.component';
import { EditBannerComponent } from './components/edit-banner/edit-banner.component';
import { environment } from 'src/environments/environment';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  @ViewChild('banner') banner: any;

  currentUser: User | null = null;
  id: string = '';
  url: string = environment.apiURL;

  storage = getStorage();
  storageAvatar: any;
  storageBanner: any;

  user: UserModel = {
    uid: '',
    email: '',
    bio: '',
    job: [],
    displayName: '',
    photoURL: '',
    bannerURL: '',
    starDocuments: [],
    following: [],
    followers: [],
  };

  documents: DocModel[] = [];

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      this.initializeUser(this.id);
      this.initializeUserDocuments(this.id);
    });

    this.currentUser = this.authService.currentUser;
    this.authService.user$.subscribe(user => {
      this.currentUser = user;

      if (this.currentUser) {
        this.storageAvatar = ref(this.storage, `${this.currentUser.uid}/avatar.jpg`);
        this.storageBanner = ref(this.storage, `${this.currentUser.uid}/banner.jpg`);
      }

    });
  }

  ngAfterViewInit() {
  }

  //initialize
  async initializeUser(id: string) {
    this.user = <any>(await this.userService.getUser(id));
  }

  async initializeUserDocuments(uid: string) {
    this.documents = <any>(await this.documentService.getPublicDocs(uid));
  }

  //handle dialog
  handleDialogBioClose = (result: any) => {
    if (!result) return;
    Object.assign(this.user, result);
    this.userService.updateUser(this.user).then(this.updateUser);
  }

  handleDialogJobClose = (result: any) => {
    if (!result) return;
    result.job = result.job.filter((item: any) => item !== '');
    Object.assign(this.user, result);
    this.userService.updateUser(this.user).then(this.updateUser);
  }

  handleDialogAvatarClose = (result: any) => {
    if (!result) return;
    uploadBytes(this.storageAvatar, result).then((snapshot) => {
      getDownloadURL(this.storageAvatar).then(url => {
        console.log(url);
        this.user.photoURL = url;
        this.userService.updateUser(this.user).then(this.updateUser);
      });
    });
  }

  handleDialogBannerClose = (result: any) => {
    if (!result) return;
    uploadBytes(this.storageBanner, result).then((snapshot) => {
      getDownloadURL(this.storageBanner).then(url => {
        console.log(url);
        this.user.bannerURL = url;
        this.userService.updateUser(this.user).then(this.updateUser);
      });
    });
  }

  handleDialogViewImageClose = (result: any) => { }

  updateUser = (res: any) => {
    Object.assign(this.user, res);
  }

  //open dialog
  openEditBio() {
    const dialogRef = this.dialog.open(EditBioComponent, {
      width: '500px',
      data: { bio: this.user.bio }
    });

    dialogRef.afterClosed().subscribe(this.handleDialogBioClose);
  }

  openEditJob() {
    const dialogRef = this.dialog.open(EditJobComponent, {
      width: '500px',
      data: { job: this.user.job }
    });

    dialogRef.afterClosed().subscribe(this.handleDialogJobClose);
  }

  openEditAvatar() {
    const dialogRef = this.dialog.open(EditAvatarComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(this.handleDialogAvatarClose);
  }

  openEditBanner() {
    const dialogRef = this.dialog.open(EditBannerComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(this.handleDialogBannerClose);
  }

  openViewImage(url: string) {
    const dialogRef = this.dialog.open(ViewImageComponent, {
      data: { url: url }
    });

    dialogRef.afterClosed().subscribe(this.handleDialogAvatarClose);
  }

}
