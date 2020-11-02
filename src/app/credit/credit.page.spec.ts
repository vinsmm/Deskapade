import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreditPage } from './credit.page';

describe('CreditPage', () => {
  let component: CreditPage;
  let fixture: ComponentFixture<CreditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
