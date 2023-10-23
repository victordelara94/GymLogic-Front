import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepoRoutineService } from 'src/app/service/repo.routine.service';
import { StateService } from 'src/app/service/state.service';
import { Exercise } from 'src/model/exercise.type';
import { FullExercise } from 'src/model/routine.type';

@Component({
  selector: 'GymLogic-exercise-card',
  templateUrl: './exercise.card.component.html',
  styleUrls: ['./exercise.card.component.scss'],
})
export class ExerciseCardComponent {
  @Input() exercise!: Exercise;
  fullExerciseForm: FormGroup;
  message: string = '';
  day!: number;
  routineId: string = '';
  constructor(
    private fb: FormBuilder,
    private stateService: StateService,
    private routineRepo: RepoRoutineService
  ) {
    this.fullExerciseForm = this.fb.group({
      sets: ['', Validators.required],
      reps: ['', Validators.required],
    });
    this.stateService.getState().subscribe({
      next: (resp) => {
        this.day = resp.day;
        this.routineId = resp.routine.id;
      },
    });
  }

  setSetsAndReps() {
    if (!this.fullExerciseForm.valid) {
      this.message = 'Por favor rellene todos los campos con números';
      return;
    }
    const fullExercise: FullExercise = {
      exercise: this.exercise,
      sets: this.fullExerciseForm.value.sets,
      reps: this.fullExerciseForm.value.reps,
    };

    this.routineRepo
      .addExercise(this.routineId, this.day, fullExercise)
      .subscribe({
        next: (updatedRoutine) => {
          this.stateService.setRoutine(updatedRoutine);
        },
      });
  }
}
