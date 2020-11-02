import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingconfirmPage } from './bookingconfirm.page';

describe('BookingconfirmPage', () => {
  let component: BookingconfirmPage;
  let fixture: ComponentFixture<BookingconfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingconfirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingconfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
