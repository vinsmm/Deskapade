import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AmenityPage } from './amenity.page';

describe('AmenityPage', () => {
  let component: AmenityPage;
  let fixture: ComponentFixture<AmenityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmenityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AmenityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
