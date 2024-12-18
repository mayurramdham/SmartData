import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoapComponent } from './soap.component';

describe('SoapComponent', () => {
  let component: SoapComponent;
  let fixture: ComponentFixture<SoapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
