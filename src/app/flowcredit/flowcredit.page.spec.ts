import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlowcreditPage } from './flowcredit.page';

describe('FlowcreditPage', () => {
  let component: FlowcreditPage;
  let fixture: ComponentFixture<FlowcreditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowcreditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlowcreditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
