import { Component, OnInit } from '@angular/core';
import { BluetoothStatusService } from '../service/bluetooth-status.service';
import {BluetoothSerial} from "@ionic-native/bluetooth-serial/ngx";
import { TextToSpeechService } from '../service/text-to-speech.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {


  constructor(
    private bluetoothStatusService: BluetoothStatusService,
    private bluetoothSerial: BluetoothSerial,
  ) {}

  ngOnInit() {
  }

  disconnect() {
    this.bluetoothSerial.disconnect().then(() => {
      console.log('Bluetooth déconnecté avec succès');
    }).catch((error) => {
      console.error('Erreur lors de la déconnexion Bluetooth:', error);
    });
  }

}
