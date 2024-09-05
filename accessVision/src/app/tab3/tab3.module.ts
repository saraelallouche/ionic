import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Tab3Component } from './tab3.component';
import { Tab3RoutingModule } from './tab3-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Tab3RoutingModule  // Import the routing module
  ],
  declarations: [Tab3Component]
})
export class Tab3PageModule {}
