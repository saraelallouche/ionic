import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { BluetoothStatusService } from '../service/bluetooth-status.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


 constructor(
    private bluetoothSerial: BluetoothSerial,
    private bluetoothStatusService: BluetoothStatusService
  ) {}

  connectToDevice() {
    this.bluetoothSerial.connect('D8:3A:DD:94:E4:06').subscribe(
      () => {
        alert('Connected to raspberry pi!');
        console.log('Connected to raspberry pi!');
        this.bluetoothStatusService.updateStatus('connected');
      },
      (error) => {
        alert('Error connecting to raspberry pi!');
        console.error('Connection error', error);
        this.bluetoothStatusService.updateStatus('disconnected');
      }
    );
  }

  listenForNotifications() {
    this.bluetoothSerial.subscribe('\n').subscribe(
      (data) => {
        console.log('Received data:', data);
        // Vous pouvez ici traiter et afficher la notification
        alert('Notification: ' + data);
      },
      (error) => {
        console.error('Error receiving data', error);
      }
    );
  }


}
