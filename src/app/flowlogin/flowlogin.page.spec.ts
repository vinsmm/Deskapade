import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlowloginPage } from './flowlogin.page';

describe('FlowloginPage', () => {
  let component: FlowloginPage;
  let fixture: ComponentFixture<FlowloginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowloginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlowloginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
