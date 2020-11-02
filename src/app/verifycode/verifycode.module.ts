import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VerifycodePageRoutingModule } from './verifycode-routing.module';
import { VerifycodePage } from './verifycode.page';
import { ReactiveFormsModule} from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    VerifycodePageRoutingModule
  ],
  declarations: [VerifycodePage]
})
export class VerifycodePageModule {}
