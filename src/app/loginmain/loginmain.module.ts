import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginmainPageRoutingModule } from './loginmain-routing.module';

import { LoginmainPage } from './loginmain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginmainPageRoutingModule
  ],
  declarations: [LoginmainPage]
})
export class LoginmainPageModule {}
