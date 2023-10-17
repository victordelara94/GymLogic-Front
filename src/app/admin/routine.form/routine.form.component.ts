import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RepoRoutineService } from 'src/app/service/repo.routine.service';
import { StateService } from 'src/app/service/state.service';
import { Routine } from 'src/model/routine.type';

@Component({
  selector: 'GymLogic-routine.form',
  templateUrl: './routine.form.component.html',
  styleUrls: ['./routine.form.component.scss'],
})
export class RoutineFormComponent {
  routineForm: FormGroup;
  errorMessage: string;
  constructor(
    private fb: FormBuilder,
    private repoRoutine: RepoRoutineService,
    private router: Router,
    private stateService: StateService
  ) {
    this.errorMessage = '';
    this.routineForm = this.fb.group({
      name: ['', Validators.required],
      days: ['', Validators.required],
      objective: ['', Validators.required],
      level: ['', Validators.required],
    });
  }

  handleSubmit() {
    this.errorMessage = '';

    if (!this.routineForm.valid) {
      this.errorMessage = 'Por favor rellene todos los campos';
      return;
    }

    const data: Partial<Routine> = this.routineForm.value;
    data.training = [];
    for (let day = 1; day < data.days! + 1; day++) {
      data.training.push({
        day: day,
        exercisesPerDay: [],
      });
    }
    console.log(data);
    data.training;
    this.repoRoutine.create(data).subscribe({
      next: (routine) => {
        this.stateService.setActualRoutine(routine);
        this.router.navigate(['adminHome/routine', routine.id]);
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
      },
    });
  }
}
