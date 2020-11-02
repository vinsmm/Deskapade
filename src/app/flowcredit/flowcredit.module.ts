import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule} from '@angular/forms'
import { FlowcreditPageRoutingModule } from './flowcredit-routing.module';

import { FlowcreditPage } from './flowcredit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FlowcreditPageRoutingModule
  ],
  declarations: [FlowcreditPage]
})
export class FlowcreditPageModule {}
