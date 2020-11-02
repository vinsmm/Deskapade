import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmenityonePage } from './amenityone.page';

const routes: Routes = [
  {
    path: '',
    component: AmenityonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmenityonePageRoutingModule {}
