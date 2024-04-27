import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonarScreenComponent } from './donar-screen.component';

describe('DonarScreenComponent', () => {
  let component: DonarScreenComponent;
  let fixture: ComponentFixture<DonarScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonarScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonarScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
