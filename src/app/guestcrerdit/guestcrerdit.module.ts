import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestcrerditPageRoutingModule } from './guestcrerdit-routing.module';

import { GuestcrerditPage } from './guestcrerdit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestcrerditPageRoutingModule
  ],
  declarations: [GuestcrerditPage]
})
export class GuestcrerditPageModule {}
