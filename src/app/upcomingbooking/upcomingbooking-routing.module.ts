import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpcomingbookingPage } from './upcomingbooking.page';

const routes: Routes = [
  {
    path: '',
    component: UpcomingbookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpcomingbookingPageRoutingModule {}
