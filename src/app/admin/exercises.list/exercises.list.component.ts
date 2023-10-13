import { Component } from '@angular/core';
import { RepoExerciseService } from 'src/app/service/repo.exercise.service';
import { Exercise } from 'src/model/exercise.type';

@Component({
  selector: 'GymLogic-exercises.list',
  templateUrl: './exercises.list.component.html',
  styleUrls: ['./exercises.list.component.scss'],
})
export class ExercisesListComponent {
  exercises: Exercise[] = [];
  constructor(private exerciseRepo: RepoExerciseService) {
    this.exerciseRepo.getAll().subscribe({
      next: (response) => (this.exercises = response),
    });
  }
}
