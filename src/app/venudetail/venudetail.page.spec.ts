import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VenudetailPage } from './venudetail.page';

describe('VenudetailPage', () => {
  let component: VenudetailPage;
  let fixture: ComponentFixture<VenudetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenudetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VenudetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
