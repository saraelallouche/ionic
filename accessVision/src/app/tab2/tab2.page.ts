import { Component, OnInit } from '@angular/core';
import { BluetoothStatusService } from '../service/bluetooth-status.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  connectionStatus: string = 'disconnected';

  constructor(private bluetoothStatusService: BluetoothStatusService) {}

  ngOnInit() {
    // Subscribe to the connection status observable
    this.bluetoothStatusService.getStatus().subscribe(status => {
      this.connectionStatus = status;
    });
  }
}

