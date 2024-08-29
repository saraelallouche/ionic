import { Component } from '@angular/core';
import { BluetoothStatusService } from '../service/bluetooth-status.service';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


 constructor(
    private bluetoothSerial: BluetoothSerial
  ) {}


  connectToDevice() {
   this.bluetoothSerial.list().then((devices) => {
      console.log('Available devices:', devices);
      const device = devices.find((d: any) => d.id === 'D8:3A:DD:94:E4:06');
      if (device) {
        this.bluetoothSerial.connect(device.id).subscribe(
          success => console.log('Connected successfully to', device.name),
          error => console.error('Connection failed', error)
        );
      } else {
        console.error('Could not find the peripheral with the specified address.');
      }
    }, (error) => {
      console.error('Error listing Bluetooth devices', error);
    });

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
