import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlowregisterPage } from './flowregister.page';

const routes: Routes = [
  {
    path: '',
    component: FlowregisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlowregisterPageRoutingModule {}
