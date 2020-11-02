import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlowactivityPageRoutingModule } from './flowactivity-routing.module';

import { FlowactivityPage } from './flowactivity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlowactivityPageRoutingModule
  ],
  declarations: [FlowactivityPage]
})
export class FlowactivityPageModule {}
