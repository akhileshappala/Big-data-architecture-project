import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonarRegistrationPageComponent } from './donar-registration-page.component';

describe('DonarRegistrationPageComponent', () => {
  let component: DonarRegistrationPageComponent;
  let fixture: ComponentFixture<DonarRegistrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonarRegistrationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonarRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
