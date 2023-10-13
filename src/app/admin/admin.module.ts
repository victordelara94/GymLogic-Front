import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin.home/admin.home.component';
import { ExerciseFormComponent } from './exercise.form/exercise.form.component';
import { ExercisesListComponent } from './exercises.list/exercises.list.component';
import { RoutineFormComponent } from './routine.form/routine.form.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    RoutineFormComponent,
    ExerciseFormComponent,
    ExercisesListComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule],
})
export class AdminModule {}
