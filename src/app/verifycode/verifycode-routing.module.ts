import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifycodePage } from './verifycode.page';

const routes: Routes = [
  {
    path: '',
    component: VerifycodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifycodePageRoutingModule {}
