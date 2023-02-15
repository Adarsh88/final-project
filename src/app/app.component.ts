import { Component } from '@angular/core';
import { ConnectionService, ConnectionState } from 'ng-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'finalProject';
  status: boolean = false;
  isConnected: boolean = true;

  // Internet Connection validation

  constructor(private connectionService: ConnectionService) {
    this.connectionService.monitor().subscribe((isConnected) => {
      this.isConnected = isConnected.hasInternetAccess;
      if (!this.isConnected) {
        this.status = true;
      }
    });
  }
}
