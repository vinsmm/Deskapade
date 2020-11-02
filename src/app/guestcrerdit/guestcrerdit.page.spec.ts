import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuestcrerditPage } from './guestcrerdit.page';

describe('GuestcrerditPage', () => {
  let component: GuestcrerditPage;
  let fixture: ComponentFixture<GuestcrerditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestcrerditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuestcrerditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
