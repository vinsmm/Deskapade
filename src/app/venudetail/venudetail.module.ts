import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms'
import { IonicModule } from '@ionic/angular';

import { VenudetailPageRoutingModule } from './venudetail-routing.module';

import { VenudetailPage } from './venudetail.page';
import { CalendarModule} from 'ion2-calendar';

@NgModule({
  imports: [
   ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    VenudetailPageRoutingModule,
CalendarModule
  ],
  declarations: [VenudetailPage]
})
export class VenudetailPageModule {}
