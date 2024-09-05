import { Component, OnInit } from '@angular/core';
import { BluetoothStatusService } from '../service/bluetooth-status.service';
import {BluetoothSerial} from "@ionic-native/bluetooth-serial/ngx";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  message: string = 'rien reçu';

  constructor(
    private bluetoothStatusService: BluetoothStatusService,
    private bluetoothSerial: BluetoothSerial
              ) {}

  ngOnInit() {
    // Subscribe to the connection status observable
    this.listenForMessages();
  }

  listenForMessages() {
      this.bluetoothSerial.subscribe('\n').subscribe(
        (message:string) => {
          console.log('Message reçu:', message);
          // Traitez le message reçu ici
          this.message = this.getCurrentTime() + message;

        },
        (error) => {
          console.error('Error receiving message:', error);
        }
      );
  }

  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
}

