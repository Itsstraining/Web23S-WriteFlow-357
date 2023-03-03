import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  constructor() { }

  members = [
    {
      name: 'Nguyễn Hoàng Trung',
      position: 'Leader & Mentor',
      image: '../../../assets/members-img/NHT.jpg',
      imageXOffset: '0px'
    },
    {
      name: 'Nguyễn Lê Quốc Khánh',
      position: 'Member 1',
      image: '../../../assets/members-img/NLQK.jpg',
      imageXOffset: '200px'
    },
    {
      name: 'Huỳnh Chu Minh Khôi',
      position: 'Member 2',
      image: '../../../assets/members-img/HCMK.jpg',
      imageXOffset: '0px'
    },
    {
      name: 'Nguyễn Ngọc Minh',
      position: 'Member 3',
      image: '../../../assets/members-img/NNM.jpg',
      imageXOffset: '100px'
    }
  ]
}
