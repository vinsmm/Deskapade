import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmenityonePageRoutingModule } from './amenityone-routing.module';

import { AmenityonePage } from './amenityone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmenityonePageRoutingModule
  ],
  declarations: [AmenityonePage]
})
export class AmenityonePageModule {}
