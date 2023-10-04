import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RepoExerciseService } from 'src/app/service/repo.exercise.service';
import { RepoRoutineService } from 'src/app/service/repo.routine.service';
import { Exercise } from 'src/model/exercise.type';
import { Routine } from 'src/model/routine.type';

@Component({
  selector: 'GymLogic-exercise.form',
  templateUrl: './exercise.form.component.html',
  styleUrls: ['./exercise.form.component.scss'],
})
export class ExerciseFormComponent {
  message: string;
  exerciseForm: FormGroup;
  actualRoutine!: Routine;
  fd: FormData;

  constructor(
    private exerciseRepo: RepoExerciseService,
    private routineRepo: RepoRoutineService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.fd = new FormData();
    this.message = '';
    this.exerciseForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      sets: ['', Validators.required],
      reps: ['', Validators.required],
    });
    this.routineRepo
      .getById(this.route.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (routine) => {
          this.actualRoutine = routine;
        },
      });
  }

  uploadFile(event: Event) {
    const target = event?.target as HTMLInputElement;
    const file = target.files?.[0];
    this.exerciseForm.value.image = file;
    this.fd.append('image', this.exerciseForm.value.image);
  }
  handleSubmit() {
    if (!this.exerciseForm.valid) {
      this.message = 'Por favor rellene todos los campos';
      return;
    }

    const data: Omit<Exercise, 'id'> = this.exerciseForm.value;

    this.fd.append('name', data.name);
    this.fd.append('sets', data.sets.toString());
    this.fd.append('reps', data.reps.toString());
    this.exerciseRepo.create(this.fd).subscribe({
      next: (response) => {
        this.routineRepo
          .addExercise(this.actualRoutine.id, response)
          .subscribe();
        this.exerciseForm.setValue({ name: '', image: '', sets: '', reps: '' });
        this.fd.delete('name');
        this.fd.delete('sets');
        this.fd.delete('reps');
        this.fd.delete('image');
        this.message = 'Ejercicio añadido';
        setTimeout(() => (this.message = 'Puede añadir otro ejercicio'), 1000);
      },
      error: () => (this.message = 'Error creando el exercicio'),
    });
  }
}
