import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestloginPageRoutingModule } from './guestlogin-routing.module';

import { GuestloginPage } from './guestlogin.page';
import { ReactiveFormsModule} from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    GuestloginPageRoutingModule
  ],
  declarations: [GuestloginPage]
})
export class GuestloginPageModule {}
