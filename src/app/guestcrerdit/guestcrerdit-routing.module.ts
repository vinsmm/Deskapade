import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestcrerditPage } from './guestcrerdit.page';

const routes: Routes = [
  {
    path: '',
    component: GuestcrerditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestcrerditPageRoutingModule {}
