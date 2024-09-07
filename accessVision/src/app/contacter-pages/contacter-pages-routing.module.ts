import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContacterPagesPage } from './contacter-pages.page';

const routes: Routes = [
  {
    path: '',
    component: ContacterPagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContacterPagesPageRoutingModule {}
