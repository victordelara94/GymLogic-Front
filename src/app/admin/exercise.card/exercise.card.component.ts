import { Component, Input } from '@angular/core';
import { Exercise } from 'src/model/exercise.type';

@Component({
  selector: 'GymLogic-exercise-card',
  templateUrl: './exercise.card.component.html',
  styleUrls: ['./exercise.card.component.scss'],
})
export class ExerciseCardComponent {
  @Input() exercise!: Exercise;

  constructor() {}
  pushExercise() {}
}
