import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RepoExerciseService } from 'src/app/service/repo.exercise.service';
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
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.fd = new FormData();
    this.message = '';
    this.exerciseForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
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
    this.exerciseRepo.create(this.fd).subscribe({
      next: () => {
        this.exerciseForm.setValue({ name: '', image: '' });
        this.fd.delete('name');
        this.fd.delete('image');
        this.message = 'Ejercicio creado';
        setTimeout(() => (this.message = 'Puede crear otro ejercicio'), 1000);
      },
      error: () => (this.message = 'Error creando el exercicio'),
    });
  }
}
