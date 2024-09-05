import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {BluetoothSerial} from "@ionic-native/bluetooth-serial/ngx"; // Importer Storage

@Component({
  selector: 'app-connecter',
  templateUrl: './connecter.page.html',
  styleUrls: ['./connecter.page.scss'],
})
export class ConnecterPage implements OnInit {
  adresse: string = '';

  constructor(
    private bluetoothSerial: BluetoothSerial,
    private storage: Storage
  ) {
  } // Injecter Storage

  async ngOnInit() {
    // Initialisation du stockage
    await this.storage.create();

    // Charger l'adresse MAC stockée (si disponible)
    const storedAdresse = await this.storage.get('adresse_mac');
    if (storedAdresse) {
      this.adresse = storedAdresse;
    }
  }

  // Sauvegarder l'adresse MAC
  async saveAdresse() {
    await this.storage.set('adresse_mac', this.adresse);
  }

  connectToDevice() {
    this.bluetoothSerial.connect('D8:3A:DD:94:E4:06').subscribe(
      (data) => {
        // Connexion réussie
        console.log('Connected:', data);
      },
      (error) => {
        // Erreur lors de la connexion
        console.error('Error connecting:', error);
      }
    );
  }
}

