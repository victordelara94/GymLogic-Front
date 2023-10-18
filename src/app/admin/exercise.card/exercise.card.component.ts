import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from 'src/model/exercise.type';

@Component({
  selector: 'GymLogic-exercise-card',
  templateUrl: './exercise.card.component.html',
  styleUrls: ['./exercise.card.component.scss'],
})
export class ExerciseCardComponent {
  @Output() exerciseEmit: EventEmitter<Exercise>;
  @Input() exercise!: Exercise;
  constructor() {
    this.exerciseEmit = new EventEmitter();
  }
  emitExercise(exercise: Exercise) {
    this.exerciseEmit.emit(exercise);
  }
}
