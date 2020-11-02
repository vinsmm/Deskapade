import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerifycodePage } from './verifycode.page';

describe('VerifycodePage', () => {
  let component: VerifycodePage;
  let fixture: ComponentFixture<VerifycodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifycodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerifycodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
