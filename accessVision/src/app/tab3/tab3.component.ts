import { Component, OnInit } from '@angular/core';
import { BluetoothStatusService } from '../service/bluetooth-status.service';
import {BluetoothSerial} from "@ionic-native/bluetooth-serial/ngx";
import { TextToSpeechService } from '../service/text-to-speech.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.component.html',
  styleUrls: ['./tab3.component.scss'],
})
export class Tab3Component  implements OnInit {
  constructor(
    private bluetoothStatusService: BluetoothStatusService,
    private bluetoothSerial: BluetoothSerial,
    private ttsService: TextToSpeechService
  ) {}

  ngOnInit() {
    this.listenForMessages() 
  }


  speak(message: string) {
    this.ttsService.speak(message)
      .then(() => console.log('Alerte lu avec succès'))
      .catch((error) => console.error('Erreur lors de la lecture du texte', error));
  }

  
  listenForMessages() {
    this.bluetoothSerial.isConnected().then(() => {
      this.bluetoothSerial.subscribe('\n').subscribe(
        (message: string) => {
          console.log("Message reçu: "+message);
          this.speak(this.cleanTensorString(message))
        },
        (error) => {
          console.error('Erreur lors de la réception de l alerte:', error);
        }
      );
    }).catch((error) => {
      console.error('Bluetooth non connecté:', error);
    });
  }


   cleanTensorString(message: string): string {
    return message.replace(/tensor\(([^)]+)\)/g, '$1');
  }
}