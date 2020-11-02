import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlowloginPage } from './flowlogin.page';

const routes: Routes = [
  {
    path: '',
    component: FlowloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlowloginPageRoutingModule {}
