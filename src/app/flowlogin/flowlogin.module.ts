import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms'

import { IonicModule } from '@ionic/angular';

import { FlowloginPageRoutingModule } from './flowlogin-routing.module';

import { FlowloginPage } from './flowlogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FlowloginPageRoutingModule
  ],
  declarations: [FlowloginPage]
})
export class FlowloginPageModule {}
