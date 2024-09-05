import { Injectable } from '@angular/core';

declare var TTS: any;

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  constructor() { }

  speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      TTS.speak({
        text: text,
        locale: 'fr-FR',  // Pour la langue française
        rate: 1.0         // Vitesse de parole
      }, 
      () => {
        resolve(); // Succès
      }, 
      (reason: any) => {
        reject(reason); // Échec
      });
    });
  }
}
