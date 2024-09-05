import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnecterPage } from './connecter.page';

const routes: Routes = [
  {
    path: '',
    component: ConnecterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnecterPageRoutingModule {}
