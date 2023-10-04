import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError } from 'rxjs';
import { RepoExerciseService } from 'src/app/service/repo.exercise.service';
import { RepoRoutineService } from 'src/app/service/repo.routine.service';
import { mockExerciseRepo, mockRoutineRepo } from 'src/mock/mock.spec';
import { Routine } from 'src/model/routine.type';
import { ExerciseFormComponent } from './exercise.form.component';

describe('ExerciseFormComponent', () => {
  let exerciseFormComponent: ExerciseFormComponent;
  let fixture: ComponentFixture<ExerciseFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [ExerciseFormComponent],
      providers: [
        { provide: RepoExerciseService, useValue: mockExerciseRepo },
        { provide: RepoRoutineService, useValue: mockRoutineRepo },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseFormComponent);
    exerciseFormComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(exerciseFormComponent).toBeTruthy();
  });
  it('uploadFile', () => {
    const mockFileEvent = { target: { files: [{}] } } as unknown as Event;
    const mockInput = fixture.debugElement.query(
      By.css('input[type="file"]')
    ).nativeElement;
    mockInput.dispatchEvent(new Event('change', mockFileEvent));
    expect(exerciseFormComponent.uploadFile).toHaveBeenCalled;
  });
  it('handleSubmit, if form is invalid', () => {
    const mockForm = fixture.debugElement.query(By.css('form')).nativeElement;
    exerciseFormComponent.exerciseForm.setValue({
      name: 'test',
      image: '',
      sets: 8,
      reps: 7,
    });
    mockForm.dispatchEvent(new Event('submit'));
    expect(exerciseFormComponent.handleSubmit).toHaveBeenCalled;
    expect(exerciseFormComponent.message).toBe(
      'Por favor rellene todos los campos'
    );
  });
  it('handleSubmit, if form is valid', () => {
    exerciseFormComponent.actualRoutine = {} as Routine;
    exerciseFormComponent.exerciseForm.setValue({
      name: 'test',
      image: '',
      sets: 8,
      reps: 7,
    });
    exerciseFormComponent.exerciseForm.get('image')!.clearValidators();
    exerciseFormComponent.exerciseForm.get('image')!.updateValueAndValidity();

    exerciseFormComponent.handleSubmit();
    expect(mockExerciseRepo.create).toHaveBeenCalled;
  });
  it('if routineRepo throw an error', () => {
    exerciseFormComponent.actualRoutine = {} as Routine;
    exerciseFormComponent.exerciseForm.setValue({
      name: 'test',
      image: '',
      sets: 8,
      reps: 7,
    });
    exerciseFormComponent.exerciseForm.get('image')!.clearValidators();
    exerciseFormComponent.exerciseForm.get('image')!.updateValueAndValidity();
    const error = new Error('test');
    spyOn(mockExerciseRepo, 'create').and.returnValue(throwError(() => error));
    exerciseFormComponent.handleSubmit();
    expect(mockExerciseRepo.create).toHaveBeenCalled();
  });
});
