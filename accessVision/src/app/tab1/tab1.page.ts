import { Component } from '@angular/core';
import { BluetoothStatusService } from '../service/bluetooth-status.service';
import {BluetoothSerial} from "@ionic-native/bluetooth-serial/ngx";
import {
  BluetoothClassicSerialPort,
} from '@awesome-cordova-plugins/bluetooth-classic-serial-port';
import {AndroidPermissions} from "@ionic-native/android-permissions/ngx";
import {AlertController, NavController} from '@ionic/angular';
import {Storage} from "@ionic/storage-angular";
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";

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
  private alertController: AlertController, // Injecter AlertController
    private iab: InAppBrowser

  ) {}

  async ngOnInit() {

  }

  async ionViewDidEnter() {
   // Initialisation du stockage
    await this.storage.create();

    // Charger l'adresse MAC stockée (si disponible)
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
    await this.verifyAdresse(); // Vérifier si l'adresse est vide
    this.bluetoothSerial.connect(this.adresse).subscribe(
      (data) => {
        // Connexion réussie
        console.log('Connected:', data);
        this.sendNotification('start'); // Envoi de la notification après connexion
        this.navCtrl.navigateForward('/tabs/tab2'); // Navigate to tab2 after successful connection

      },
      (error) => {
        // Erreur lors de la connexion
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
   // Vérifier si l'adresse est vide
    if (!this.adresse || this.adresse.trim() === '') {
      // Si l'adresse n'est pas présente, afficher une alerte
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: 'Veuillez saisir une adresse MAC avant de commencer.',
        buttons: ['OK']
      });
      await alert.present();
      return; // Ne pas continuer la connexion si l'adresse est vide
    }

  }

  // Fonction pour ouvrir le lien YouTube
  openTutorial() {
    const url = 'https://www.youtube.com/channel/UCJXSJ07RDcSQSBFf9Sn_hOw'; // Lien vers la vidéo YouTube
    this.iab.create(url, '_system'); // Ouvre le lien dans l'application ou le navigateur
  }
}
