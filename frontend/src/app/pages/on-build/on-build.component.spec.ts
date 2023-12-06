import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBuildComponent } from './on-build.component';

describe('OnBuildComponent', () => {
  let component: OnBuildComponent;
  let fixture: ComponentFixture<OnBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBuildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
