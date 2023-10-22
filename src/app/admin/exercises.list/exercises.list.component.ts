import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RepoExerciseService } from 'src/app/service/repo.exercise.service';
import { RepoRoutineService } from 'src/app/service/repo.routine.service';
import { Exercise } from 'src/model/exercise.type';

@Component({
  selector: 'GymLogic-exercises-list',
  templateUrl: './exercises.list.component.html',
  styleUrls: ['./exercises.list.component.scss'],
})
export class ExercisesListComponent {
  @Input() id!: string;
  exercises: Exercise[] = [];
  @Output() isOpen: EventEmitter<boolean>;
  constructor(
    private exerciseRepo: RepoExerciseService,
    private routineRepo: RepoRoutineService
  ) {
    this.exerciseRepo.getAll().subscribe({
      next: (response) => (this.exercises = response),
    });
    this.isOpen = new EventEmitter();
  }
  searchExercises(event: Event, key: string, value: string) {
    event.preventDefault();

    if (key === 'name' && value) {
      this.exerciseRepo.filterExercises(key, value).subscribe({
        next: (response) => (this.exercises = response),
      });
      return;
    }
    if (key === 'muscle' && value) {
      this.exerciseRepo.filterExercises('muscle', value).subscribe({
        next: (response) => (this.exercises = response),
      });
      return;
    } else {
      this.exerciseRepo.getAll().subscribe({
        next: (response) => (this.exercises = response),
      });
    }
  }
  emitEventValue() {
    this.isOpen.emit(false);
  }
}
