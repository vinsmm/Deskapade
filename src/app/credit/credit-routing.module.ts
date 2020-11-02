import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditPage } from './credit.page';

const routes: Routes = [
  {
    path: '',
    component: CreditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditPageRoutingModule {}
