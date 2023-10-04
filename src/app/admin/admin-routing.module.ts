import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin.home/admin.home.component';
import { ExerciseFormComponent } from './exercise.form/exercise.form.component';
import { RoutineFormComponent } from './routine.form/routine.form.component';

const routes: Routes = [
  { path: 'adminHome', component: AdminHomeComponent },
  { path: 'adminHome/addRoutine', component: RoutineFormComponent },
  { path: 'adminHome/addExercise', component: ExerciseFormComponent },
  { path: 'adminHome/addExercise/:id', component: ExerciseFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
