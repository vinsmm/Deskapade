import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmenityPageRoutingModule } from './amenity-routing.module';

import { AmenityPage } from './amenity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmenityPageRoutingModule
  ],
  declarations: [AmenityPage]
})
export class AmenityPageModule {}
