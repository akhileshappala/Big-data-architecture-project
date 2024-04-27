import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadscreenComponent } from './uploadscreen.component';

describe('UploadscreenComponent', () => {
  let component: UploadscreenComponent;
  let fixture: ComponentFixture<UploadscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadscreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
