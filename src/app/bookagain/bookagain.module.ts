import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms'
import { IonicModule } from '@ionic/angular';

import { BookagainPageRoutingModule } from './bookagain-routing.module';

import { BookagainPage } from './bookagain.page';
import { CalendarModule} from 'ion2-calendar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CalendarModule,
    BookagainPageRoutingModule
  ],
  declarations: [BookagainPage]
})
export class BookagainPageModule {}
