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
      position: ' Mentor',
      image: '../../../assets/members-img/NHT.jpg',
      imageXOffset: '0px'
    },
    {
      name: 'Nguyễn Lê Quốc Khánh',
      position: 'Leader & Developer',
      image: '../../../assets/members-img/NLQK.jpg',
      imageXOffset: '200px'
    },
    {
      name: 'Huỳnh Chu Minh Khôi',
      position: 'Developer',
      image: '../../../assets/members-img/HCMK.jpg',
      imageXOffset: '0px'
    },
    {
      name: 'Nguyễn Ngọc Minh',
      position: 'Developer',
      image: '../../../assets/members-img/NNM.jpg',
      imageXOffset: '100px'
    }
  ]
}
