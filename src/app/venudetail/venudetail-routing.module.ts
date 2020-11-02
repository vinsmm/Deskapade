import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VenudetailPage } from './venudetail.page';

const routes: Routes = [
  {
    path: '',
    component: VenudetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VenudetailPageRoutingModule {}
