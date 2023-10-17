import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepoExerciseService } from 'src/app/service/repo.exercise.service';
import { Exercise } from 'src/model/exercise.type';

@Component({
  selector: 'GymLogic-exercises-list',
  templateUrl: './exercises.list.component.html',
  styleUrls: ['./exercises.list.component.scss'],
})
export class ExercisesListComponent {
  exercises: Exercise[] = [];
  constructor(
    private exerciseRepo: RepoExerciseService,
    private router: ActivatedRoute
  ) {
    this.exerciseRepo.getAll().subscribe({
      next: (response) => (this.exercises = response),
    });
  }
  findExercise(ev: Event) {
    const form = ev.target as HTMLFormElement;
    const filterExercises = this.exercises.filter((exercise) => {
      exercise.name === (form.elements[0] as HTMLInputElement).value;
    });
    if (filterExercises.length) this.exercises = filterExercises;
  }
}
