import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StripayPageRoutingModule } from './stripay-routing.module';
import { ReactiveFormsModule} from '@angular/forms'
import { StripayPage } from './stripay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    StripayPageRoutingModule
  ],
  declarations: [StripayPage]
})
export class StripayPageModule {}
