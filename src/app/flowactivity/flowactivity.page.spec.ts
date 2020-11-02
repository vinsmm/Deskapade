import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlowactivityPage } from './flowactivity.page';

describe('FlowactivityPage', () => {
  let component: FlowactivityPage;
  let fixture: ComponentFixture<FlowactivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowactivityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlowactivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
