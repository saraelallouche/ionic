import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'connecter',
    loadChildren: () => import('./connecter/connecter.module').then( m => m.ConnecterPageModule)
  },
  {
    path: 'contacter-pages',
    loadChildren: () => import('./contacter-pages/contacter-pages.module').then( m => m.ContacterPagesPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
