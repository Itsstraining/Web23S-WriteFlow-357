import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  sidebarToggle: boolean = true;
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
  constructor(private route: Router) {
  }
  ngOnInit(): void {
  }
  //Ẩn hiện sidebar
  sidebarChange() {
    this.sidebarToggle = !this.sidebarToggle;
  }
  navigate(link: string) {

    this.route.navigate([`main/${link}`]);
    this.navigateItems.forEach((item) => {
      item.link == link ? item.active = true : item.active = false;
    })
  }
}
