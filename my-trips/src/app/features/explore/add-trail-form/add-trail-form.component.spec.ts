import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrailFormComponent } from './add-trail-form.component';

describe('AddTrailFormComponent', () => {
  let component: AddTrailFormComponent;
  let fixture: ComponentFixture<AddTrailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTrailFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
