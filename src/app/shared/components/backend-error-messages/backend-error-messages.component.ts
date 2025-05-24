import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.css'],
  standalone:true
})
export class BackendErrorMessagesComponent {

  @Input() backendErrors:any

}
