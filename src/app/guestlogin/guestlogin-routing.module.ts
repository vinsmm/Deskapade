import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestloginPage } from './guestlogin.page';

const routes: Routes = [
  {
    path: '',
    component: GuestloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestloginPageRoutingModule {}
