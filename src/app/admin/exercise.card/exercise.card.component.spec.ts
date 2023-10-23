import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { RepoRoutineService } from 'src/app/service/repo.routine.service';
import { StateService } from 'src/app/service/state.service';
import { mockExercise, mockRoutine } from 'src/mock/mock.spec';
import { Exercise } from 'src/model/exercise.type';
import { State } from 'src/types/state.type';
import { ExerciseCardComponent } from './exercise.card.component';

describe('ExerciseCardComponent', () => {
  let component: ExerciseCardComponent;
  let fixture: ComponentFixture<ExerciseCardComponent>;
  let repo: RepoRoutineService;
  let state: StateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseCardComponent],
      providers: [StateService, RepoRoutineService],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(ExerciseCardComponent);
    repo = TestBed.inject(RepoRoutineService);
    state = TestBed.inject(StateService);
    component = fixture.componentInstance;
    component.exercise = mockExercise;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('if submit event, setSetsAndReps() have been called', () => {
    component.exercise = {} as Exercise;
    spyOn(state, 'getState').and.returnValue(
      of({ day: 2, routine: { id: 'test' } } as State)
    );
    spyOn(state, 'setRoutine').and.callThrough();
    const mockForm = fixture.debugElement.query(By.css('form')).nativeElement;
    component.fullExerciseForm.setValue({
      sets: 4,
      reps: 2,
    });
    spyOn(repo, 'addExercise').and.returnValue(of(mockRoutine));
    mockForm.dispatchEvent(new Event('submit'));
    expect(repo.addExercise).toHaveBeenCalled();
  });
  it('if submit event, setSetsAndReps() have been called with a not valid form', () => {
    const mockForm = fixture.debugElement.query(By.css('form')).nativeElement;
    component.fullExerciseForm.setValue({
      sets: 4,
      reps: '',
    });
    spyOn(repo, 'addExercise');
    mockForm.dispatchEvent(new Event('submit'));
    expect(repo.addExercise).not.toHaveBeenCalled();
  });
});
