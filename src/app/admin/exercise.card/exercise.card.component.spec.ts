import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseCardComponent } from './exercise.card.component';

describe('ExerciseCardComponent', () => {
  let component: ExerciseCardComponent;
  let fixture: ComponentFixture<ExerciseCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseCardComponent]
    });
    fixture = TestBed.createComponent(ExerciseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
