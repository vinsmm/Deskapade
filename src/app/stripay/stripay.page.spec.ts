import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StripayPage } from './stripay.page';

describe('StripayPage', () => {
  let component: StripayPage;
  let fixture: ComponentFixture<StripayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StripayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
