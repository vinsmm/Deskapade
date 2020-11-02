import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoggedcreditPage } from './loggedcredit.page';

describe('LoggedcreditPage', () => {
  let component: LoggedcreditPage;
  let fixture: ComponentFixture<LoggedcreditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedcreditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoggedcreditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
