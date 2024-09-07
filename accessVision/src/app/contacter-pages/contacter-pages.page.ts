import { Component, OnInit } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {EmailComposer} from "@ionic-native/email-composer/ngx";
import {CallNumber} from "@ionic-native/call-number/ngx";

@Component({
  selector: 'app-contacter-pages',
  templateUrl: './contacter-pages.page.html',
  styleUrls: ['./contacter-pages.page.scss'],
})
export class ContacterPagesPage implements OnInit {

  constructor(
    private callNumber: CallNumber,
    private emailComposer: EmailComposer,
    private alertController: AlertController
  )
  { }

  ngOnInit() {
  }

  // Fonction pour appeler le support
  async callSupport() {
    try {
      await this.callNumber.callNumber('0666705856', true); // Numéro du support
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: 'Impossible de passer l\'appel. Veuillez vérifier votre téléphone.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Fonction pour envoyer un email au support


  // Affiche une alerte si l'application de messagerie n'est pas disponible
  async showEmailError() {
    const alert = await this.alertController.create({
      header: 'Erreur',
      message: 'Aucune application de messagerie disponible.',
      buttons: ['OK']
    });
    await alert.present();
  }

  openEmail() {
    try{
        window.open('mailto:accessvision2024@gmail.com?subject=Demande de support&body=Bonjour, j\'ai besoin d\'aide concernant ...', '_system');
    }
    catch (error) {
      this.showEmailError();
    }
  }

}
