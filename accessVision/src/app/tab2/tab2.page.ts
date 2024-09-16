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

  // Flag pour vérifier si une lecture est en cours
  private isSpeaking: boolean = false;

  constructor(
    private bluetoothStatusService: BluetoothStatusService,
    private bluetoothSerial: BluetoothSerial,
    private ttsService: TextToSpeechService
  ) {}

  ngOnInit() {
    this.listenForMessages();
  }

  listenForMessages() {
    this.bluetoothSerial.isConnected().then(() => {
      this.bluetoothSerial.subscribe('\n').subscribe(
        (message: string) => {
          console.log("Message reçu: " + message);
          // Tentative de lire le message seulement si aucune lecture n'est en cours
          this.speak(this.cleanTensorString(message));
        },
        (error) => {
          console.error('Erreur lors de la réception de l alerte:', error);
        }
      );
    }).catch((error) => {
      console.error('Bluetooth non connecté:', error);
    });
  }

  speak(message: string) {
    // Si une lecture est déjà en cours, on ne fait rien
    if (this.isSpeaking) {
      console.log('Lecture déjà en cours, alerte ignorée: ', message);
      return;
    }

    // Marque la lecture comme en cours
    this.isSpeaking = true;

    this.ttsService.speak(message)
      .then(() => {
        console.log('Alerte lue avec succès');
      })
      .catch((error) => {
        console.error('Erreur lors de la lecture du texte', error);
      })
      .finally(() => {
        // Remet le flag à false une fois la lecture terminée
        this.isSpeaking = false;
      });
  }

  cleanTensorString(message: string): string {
    return message.replace(/tensor\(([^)]+)\)/g, '$1');
  }

  disconnect() {
    this.bluetoothSerial.disconnect().then(() => {
      this.speak("Vous êtes déconnecté du boitier");
      console.log('Bluetooth déconnecté avec succès');
    }).catch((error) => {
      console.error('Erreur lors de la déconnexion Bluetooth:', error);
    });
  }
}
