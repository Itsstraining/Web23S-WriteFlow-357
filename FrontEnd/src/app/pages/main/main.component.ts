import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentState } from 'src/ngrx/states/document.state';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  sidebarToggle: boolean = true;
  activeLink: string = '';
  navigateItems: any[] = [
    {
      icon: 'contact_page',
      title: 'Documents',
      link: 'documents/owned',
      active: true
    },
    {
      icon: 'description',
      title: 'Shared Documents',
      link: 'documents/shared',
      active: false
    },
    {
      icon: 'star',
      title: 'Favorites',
      link: 'documents/favorite',
      active: false
    },
    {
      icon: 'delete',
      title: 'Recyle bin',
      link: 'recycle',
      active: false
    },
    {
      icon: 'mail',
      title: 'Mail',
      link: 'mail',
      active: false
    }
  ]
  document$ = this.store.select('doc');

  currentUser: any;
  innerWidth: any;

  constructor(
    private route: Router,
    private store: Store<{ doc: DocumentState }>,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    // this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    //get link from url and active link
    let currentURL = this.route.url.split('/');
    if (currentURL[3] == undefined) {
      this.activeLink = currentURL[2];
    }
    else {
      this.activeLink = `${currentURL[2]}/${currentURL[3]}`;
    }
    this.navigateItems.forEach((item) => {
      item.link == this.activeLink ? item.active = true : item.active = false;
    })
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.innerWidth = window.innerWidth;
  }


  navigate(link: string) {
    this.navigateItems.forEach((item) => {
      item.link == link ? item.active = true : item.active = false;
    })
    this.route.navigate([`main/${link}`]);
  }

  logout() {
    this.authService.logout();
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }
}
