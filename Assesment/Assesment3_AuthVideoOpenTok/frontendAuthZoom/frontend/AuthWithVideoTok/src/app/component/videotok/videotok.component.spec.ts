import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideotokComponent } from './videotok.component';

describe('VideotokComponent', () => {
  let component: VideotokComponent;
  let fixture: ComponentFixture<VideotokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideotokComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideotokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
