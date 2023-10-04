import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RepoRoutineService } from 'src/app/service/repo.routine.service';
import { mockRoutineRepo } from 'src/mock/mock.spec';
import { Routine } from 'src/model/routine.type';
import { AdminHomeComponent } from '../admin.home/admin.home.component';
import { ExerciseFormComponent } from '../exercise.form/exercise.form.component';
import { RoutineFormComponent } from './routine.form.component';

describe('RoutineFormComponent', () => {
  let routineFormComponent: RoutineFormComponent;
  let fixture: ComponentFixture<RoutineFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutineFormComponent],
      imports: [
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'adminHome', component: AdminHomeComponent },
          {
            path: 'adminHome/addExercise/test',
            component: ExerciseFormComponent,
          },
        ]),
      ],
      providers: [{ provide: RepoRoutineService, useValue: mockRoutineRepo }],
    }).compileComponents();

    fixture = TestBed.createComponent(RoutineFormComponent);
    routineFormComponent = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(routineFormComponent).toBeTruthy();
  });
  it('routineForm valid', () => {
    routineFormComponent.routineForm.setValue({
      name: 'test',
      objective: 'fuerza',
      level: 'intermedio',
    });
    spyOn(mockRoutineRepo, 'create').and.returnValue(
      of({ id: 'test' } as Routine)
    );
    routineFormComponent.handleSubmit();
    expect(mockRoutineRepo.create).not.toBeNull();
  });
  it('routineForm not valid', () => {
    routineFormComponent.routineForm.setValue({
      name: 'test',
      objective: 'fuerza',
      level: '',
    });

    routineFormComponent.handleSubmit();
    expect(routineFormComponent.errorMessage).toBe(
      'Por favor rellene todos los campos'
    );
  });
});
