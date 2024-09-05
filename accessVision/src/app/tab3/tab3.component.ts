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

  ngOnInit() {}


  speak() {
    this.ttsService.speak('Bonjour tout le monde!')
      .then(() => console.log('Texte lu avec succès'))
      .catch((error) => console.error('Erreur lors de la lecture du texte', error));
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

  
  listenForMessages() {
    // Vérifier d'abord si la connexion est bien établie
    this.bluetoothSerial.isConnected().then(() => {
      this.sendNotification("start");
      console.log('Bluetooth connecté, écoute des messages...');
      this.bluetoothSerial.subscribe('\n').subscribe(
        (message: string) => {
          console.log('Message reçu:', message);
        },
        (error) => {
          console.error('Erreur lors de la réception du message:', error);
        }
      );
    }).catch((error) => {
      console.error('Bluetooth non connecté:', error);
      // Vous pouvez ajouter une logique pour essayer de se reconnecter ici
    });
  }

}
