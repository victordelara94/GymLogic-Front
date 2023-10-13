import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin.home/admin.home.component';
import { ExerciseFormComponent } from './exercise.form/exercise.form.component';
import { ExercisesListComponent } from './exercises.list/exercises.list.component';
import { RoutineFormComponent } from './routine.form/routine.form.component';

const routes: Routes = [
  { path: 'adminHome', component: AdminHomeComponent },
  { path: 'adminHome/addRoutine', component: RoutineFormComponent },
  { path: 'adminHome/create', component: ExerciseFormComponent },
  {
    path: 'adminHome/create/addExercise/:id',
    component: ExerciseFormComponent,
  },
  { path: 'adminHome/addExercise/:id', component: ExercisesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
