import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookagainPage } from './bookagain.page';

describe('BookagainPage', () => {
  let component: BookagainPage;
  let fixture: ComponentFixture<BookagainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookagainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookagainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
