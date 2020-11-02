import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule} from '@angular/forms'
import { LoggedcreditPageRoutingModule } from './loggedcredit-routing.module';
import { LoggedcreditPage } from './loggedcredit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoggedcreditPageRoutingModule
  ],
  declarations: [LoggedcreditPage]
})
export class LoggedcreditPageModule {}
