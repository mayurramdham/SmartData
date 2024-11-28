import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservavalsPromisesComponent } from './observavals-promises.component';

describe('ObservavalsPromisesComponent', () => {
  let component: ObservavalsPromisesComponent;
  let fixture: ComponentFixture<ObservavalsPromisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservavalsPromisesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservavalsPromisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
