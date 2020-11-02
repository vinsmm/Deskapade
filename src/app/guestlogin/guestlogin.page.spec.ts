import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuestloginPage } from './guestlogin.page';

describe('GuestloginPage', () => {
  let component: GuestloginPage;
  let fixture: ComponentFixture<GuestloginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestloginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuestloginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
