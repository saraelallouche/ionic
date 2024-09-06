import { Component } from '@angular/core';
import {BluetoothSerial} from "@ionic-native/bluetooth-serial/ngx";

import {AndroidPermissions} from "@ionic-native/android-permissions/ngx";
import {AlertController, NavController} from '@ionic/angular';
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  adresse: string = 'test';

 constructor(
    private bluetoothSerial: BluetoothSerial,
    private androidPermissions: AndroidPermissions,
    private navCtrl: NavController,
    private storage: Storage,
    private alertController: AlertController,

  ) {}

  async ngOnInit() {

  }

  async ionViewDidEnter() {
    await this.storage.create();
    const storedAdresse = await this.storage.get('adresse_mac');
    if (storedAdresse) {
      this.adresse = storedAdresse;
    }
    else {
      this.adresse = '';
    }
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

  async connectToDevice() {
    await this.verifyAdresse(); 
    this.bluetoothSerial.connect(this.adresse).subscribe(
      (data) => {
        this.sendNotification('start'); 
        this.navCtrl.navigateForward('/tabs/tab2');

      },
      (error) => {
        console.error('Error connecting:', error);
      }
    );
  }

  sendNotification(message: string) {
    this.bluetoothSerial.write(message).then(
      () => {
        console.log('Notification envoyée :', message);
      },
      (error) => {
        console.error('Erreur lors de l\'envoi de la notification :', error);
      }
    );
  }

  async verifyAdresse() {
    if (!this.adresse || this.adresse.trim() === '') {
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: 'Veuillez saisir une adresse MAC avant de commencer.',
        buttons: ['OK']
      });
      await alert.present();
      return; 
    }

  }
}
