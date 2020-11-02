import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlowcreditPage } from './flowcredit.page';

const routes: Routes = [
  {
    path: '',
    component: FlowcreditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlowcreditPageRoutingModule {}
