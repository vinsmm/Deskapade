import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlowactivityPage } from './flowactivity.page';

const routes: Routes = [
  {
    path: '',
    component: FlowactivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlowactivityPageRoutingModule {}
