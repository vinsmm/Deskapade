import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginmainPage } from './loginmain.page';

const routes: Routes = [
  {
    path: '',
    component: LoginmainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginmainPageRoutingModule {}
