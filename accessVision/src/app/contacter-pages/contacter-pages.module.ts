import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContacterPagesPageRoutingModule } from './contacter-pages-routing.module';

import { ContacterPagesPage } from './contacter-pages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContacterPagesPageRoutingModule
  ],
  declarations: [ContacterPagesPage]
})
export class ContacterPagesPageModule {}
