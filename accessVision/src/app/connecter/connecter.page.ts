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
    if (!this.adresse) {
          await this.storage.set('adresse_mac', "");
    }
    await this.storage.set('adresse_mac', this.adresse);
  }

}

