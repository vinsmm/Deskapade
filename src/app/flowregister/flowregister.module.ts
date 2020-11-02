import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule} from '@angular/forms'
import { FlowregisterPageRoutingModule } from './flowregister-routing.module';

import { FlowregisterPage } from './flowregister.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FlowregisterPageRoutingModule
  ],
  declarations: [FlowregisterPage]
})
export class FlowregisterPageModule {}
