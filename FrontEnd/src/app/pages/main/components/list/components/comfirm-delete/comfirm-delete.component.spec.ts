import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfirmDeleteComponent } from './comfirm-delete.component';

describe('ComfirmDeleteComponent', () => {
  let component: ComfirmDeleteComponent;
  let fixture: ComponentFixture<ComfirmDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComfirmDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
