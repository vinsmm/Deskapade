import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlowregisterPage } from './flowregister.page';

describe('FlowregisterPage', () => {
  let component: FlowregisterPage;
  let fixture: ComponentFixture<FlowregisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowregisterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlowregisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
