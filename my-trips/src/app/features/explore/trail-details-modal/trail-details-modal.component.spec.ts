import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailDetailsModalComponent } from './trail-details-modal.component';

describe('TrailDetailsModalComponent', () => {
  let component: TrailDetailsModalComponent;
  let fixture: ComponentFixture<TrailDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrailDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
