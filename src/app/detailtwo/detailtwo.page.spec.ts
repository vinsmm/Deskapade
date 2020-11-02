import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailtwoPage } from './detailtwo.page';

describe('DetailtwoPage', () => {
  let component: DetailtwoPage;
  let fixture: ComponentFixture<DetailtwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailtwoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailtwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
