import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmenityPage } from './amenity.page';

const routes: Routes = [
  {
    path: '',
    component: AmenityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmenityPageRoutingModule {}
