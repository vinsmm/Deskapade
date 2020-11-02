import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpcomingbookingPageRoutingModule } from './upcomingbooking-routing.module';

import { UpcomingbookingPage } from './upcomingbooking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpcomingbookingPageRoutingModule
  ],
  declarations: [UpcomingbookingPage]
})
export class UpcomingbookingPageModule {}
