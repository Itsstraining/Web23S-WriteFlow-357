import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  @Input() inputStatus: Object = {
    type: 'error',
    message: 'Error',
    icon: 'error',
    stacked: false,
  }
}
