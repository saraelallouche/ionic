import { Component } from '@angular/core';
import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from "@ionic/storage-angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { TextToSpeechService } from "../service/text-to-speech.service";

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
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.speak("Bienvenue sur l'application Access Vision");
    }, 3000);

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
    this.findBluetoothDevice();
    /*
    
    */
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
      .then()
      .catch((error) => console.error('Erreur lors de la lecture du texte', error));
  }

  openTutorial() {
    const url = 'https://www.youtube.com/channel/UCJXSJ07RDcSQSBFf9Sn_hOw';
    this.iab.create(url, '_system');
  }

  findBluetoothDevice() {
    this.speak("Connection au boitier");

    this.bluetoothSerial.discoverUnpaired().then((devices) => {
      let foundDevice = devices.find((device: { name: string | string[]; }) => device.name && device.name.includes("raspberry"));  
      if (foundDevice) {
        console.log(`Raspberry Pi trouvée: ${foundDevice.name} - MAC: ${foundDevice.id}`);
        this.bluetoothSerial.connect(foundDevice.id).subscribe(
          (data) => {
            this.sendNotification('start');
            this.speak("Vous êtes connecté");
            this.navCtrl.navigateForward('/tabs/tab2');
          },
          (error) => {
            console.error('Error connecting:', error);
          }
        );
      } else {
        console.log('Raspberry Pi non trouvée');
      }
    }).catch((error) => {
      console.error('Erreur lors du scan Bluetooth', error);
    });
  };
}


