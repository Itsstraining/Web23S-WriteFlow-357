import { Component, Input, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @ViewChildren('container') container: any;
  @Input() inputData: any;
  @Input() loading: boolean = false;
  @Input() fixed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.fixed) {
      this.container.last.nativeElement.style.position = 'fixed';
    }
  }
}
