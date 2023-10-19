import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exercise } from 'src/model/exercise.type';
import { fullExercise } from 'src/model/routine.type';

@Component({
  selector: 'GymLogic-exercise-card',
  templateUrl: './exercise.card.component.html',
  styleUrls: ['./exercise.card.component.scss'],
})
export class ExerciseCardComponent {
  @Output() fullExerciseEmit: EventEmitter<fullExercise>;
  @Input() exercise!: Exercise;
  fullExerciseForm: FormGroup;
  message: string = '';
  constructor(private fb: FormBuilder) {
    this.fullExerciseEmit = new EventEmitter();
    this.fullExerciseForm = this.fb.group({
      sets: ['', Validators.required],
      reps: ['', Validators.required],
    });
  }

  setSetsAndReps() {
    if (!this.fullExerciseForm.valid) {
      this.message = 'Por favor rellene todos los campos con números';
      return;
    }
    this.fullExerciseEmit.emit({
      exercise: this.exercise,
      sets: this.fullExerciseForm.value.sets,
      reps: this.fullExerciseForm.value.reps,
    });
  }
}
