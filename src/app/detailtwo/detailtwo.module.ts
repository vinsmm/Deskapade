import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailtwoPageRoutingModule } from './detailtwo-routing.module';

import { DetailtwoPage } from './detailtwo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailtwoPageRoutingModule
  ],
  declarations: [DetailtwoPage]
})
export class DetailtwoPageModule {}
