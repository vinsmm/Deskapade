import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AmenityonePage } from './amenityone.page';

describe('AmenityonePage', () => {
  let component: AmenityonePage;
  let fixture: ComponentFixture<AmenityonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmenityonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AmenityonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
