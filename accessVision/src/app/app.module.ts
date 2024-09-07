import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {
  BluetoothClassicSerialPort,
} from '@awesome-cordova-plugins/bluetooth-classic-serial-port';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {IonicStorageModule} from "@ionic/storage-angular";
import {CallNumber} from "@ionic-native/call-number/ngx";
import {EmailComposer} from "@ionic-native/email-composer/ngx";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [ IonicStorageModule.forRoot(), BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [InAppBrowser, CallNumber,EmailComposer, Platform, AndroidPermissions, BluetoothSerial, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
