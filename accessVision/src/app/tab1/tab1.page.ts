import { Component } from '@angular/core';
import {BluetoothSerial} from "@ionic-native/bluetooth-serial/ngx";

import {AndroidPermissions} from "@ionic-native/android-permissions/ngx";
import {AlertController, NavController} from '@ionic/angular';
import {Storage} from "@ionic/storage-angular";
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";
import {TextToSpeechService} from "../service/text-to-speech.service";

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
    private iab: InAppBrowser,
    private ttsService: TextToSpeechService


  ) {}

  async ngOnInit() {
   await this.storage.create();
    const storedAdresse = await this.storage.get('adresse_mac');
    if (storedAdresse) {
      this.speak("Bienvenue sur l'application Access Vision. Veuillez cliquer sur 'Se Connecter' pour commencer.")
    }
    else {
      this.speak("Bienvenue sur l'application Access Vision. Veuillez saisir l'adresse MAC de votre appareil pour commencer.")
    }
  }

  async ionViewDidEnter() {
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
    let haveAdresse = await this.verifyAdresse();
    if (!haveAdresse) {
      return;
    }
    this.bluetoothSerial.connect(this.adresse).subscribe(
      (data) => {
        this.sendNotification('start');
        this.navCtrl.navigateForward('/tabs/tab2 ');

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

  async verifyAdresse(): Promise<boolean> {
    let message = "Veuillez saisir une adresse MAC avant de commencer."
    if (!this.adresse || this.adresse.trim() === '') {
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: message,
        buttons: ['OK']
      });
      await alert.present();
      this.speak(message)
      return false;
    }
    return true;
  }

  speak(message: string) {
    this.ttsService.speak(message)
      .then(() => console.log('Alerte lu avec succès'))
      .catch((error) => console.error('Erreur lors de la lecture du texte', error));
  }

  // Fonction pour ouvrir le lien YouTube
  openTutorial() {
    const url = 'https://www.youtube.com/channel/UCJXSJ07RDcSQSBFf9Sn_hOw'; // Lien vers la vidéo YouTube
    this.iab.create(url, '_system'); // Ouvre le lien dans l'application ou le navigateur
  }
}
