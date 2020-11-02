import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedcreditPage } from './loggedcredit.page';

const routes: Routes = [
  {
    path: '',
    component: LoggedcreditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedcreditPageRoutingModule {}
