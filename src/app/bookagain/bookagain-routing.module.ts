import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookagainPage } from './bookagain.page';

const routes: Routes = [
  {
    path: '',
    component: BookagainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookagainPageRoutingModule {}
