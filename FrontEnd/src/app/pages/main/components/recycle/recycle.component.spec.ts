import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecycleComponent } from './recycle.component';

describe('RecycleComponent', () => {
  let component: RecycleComponent;
  let fixture: ComponentFixture<RecycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
