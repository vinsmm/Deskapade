import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailtwoPage } from './detailtwo.page';

const routes: Routes = [
  {
    path: '',
    component: DetailtwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailtwoPageRoutingModule {}
