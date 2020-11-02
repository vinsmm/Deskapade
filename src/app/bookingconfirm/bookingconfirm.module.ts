import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingconfirmPageRoutingModule } from './bookingconfirm-routing.module';

import { BookingconfirmPage } from './bookingconfirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingconfirmPageRoutingModule
  ],
  declarations: [BookingconfirmPage]
})
export class BookingconfirmPageModule {}
