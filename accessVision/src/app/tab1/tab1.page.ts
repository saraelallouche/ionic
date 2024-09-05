import { Component } from '@angular/core';
import { BluetoothStatusService } from '../service/bluetooth-status.service';
import {BluetoothSerial} from "@ionic-native/bluetooth-serial/ngx";
import {
  BluetoothClassicSerialPort,
} from '@awesome-cordova-plugins/bluetooth-classic-serial-port';
import {AndroidPermissions} from "@ionic-native/android-permissions/ngx";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


 constructor(
    private bluetoothSerial: BluetoothSerial,
    private androidPermissions: AndroidPermissions,
  ) {}


  scanDevice() {
   BluetoothClassicSerialPort.list().then((devices) => { console.log(devices); });
  }

  ionViewDidEnter() {
    this.checkBluetoothPermissions().then(() => {
    }).catch((error) => {
      console.error('Permissions refusées', error);
    });
  }

  async checkBluetoothPermissions(): Promise<void> {
    const hasPermission = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.BLUETOOTH_SCAN);
    if (!hasPermission.hasPermission) {
      await this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.BLUETOOTH_SCAN,
        this.androidPermissions.PERMISSION.BLUETOOTH_CONNECT,
        this.androidPermissions.PERMISSION.BLUETOOTH_ADMIN,
        this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
      ]);
    }
  }


}
