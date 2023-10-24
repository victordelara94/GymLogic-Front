import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepoRoutineService } from 'src/app/service/repo.routine.service';
import { RepoUserService } from 'src/app/service/repo.user.service';
import { StateService } from 'src/app/service/state.service';
import { Routine } from 'src/model/routine.type';
import { User } from 'src/model/user.type';

@Component({
  selector: 'GymLogic-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  routine!: Routine;
  id!: string;
  message!: string;
  user!: User;
  actualRoutineId: string = '';
  constructor(
    private routineRepo: RepoRoutineService,
    private userRepo: RepoUserService,
    private route: ActivatedRoute,
    private stateService: StateService
  ) {
    this.routine = {} as Routine;
    this.user = {} as User;
    this.stateService.getState().subscribe({
      next: (data) => {
        this.user = data.actualUser?.user!;
        this.actualRoutineId = data.actualUser?.user.actualRoutine.routine?.id!;
        console.log(data.actualUser?.user);
      },
    });
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.routineRepo.getById(this.id).subscribe({
      next: (routine) => {
        this.routine = routine;
        this.stateService.setRoutine(routine);
      },
    });
  }
  addUserRoutine() {
    this.userRepo.addActualRoutine(this.routine.id).subscribe({
      next: (user) => {
        this.message = 'Rutina añadida a su usuario: ' + this.routine.name;
        this.stateService.updateUser(user);
        this.user = user;
      },
    });
  }
  isCompleted(ev: Event) {
    const checkboxValue = (ev.target as HTMLInputElement).checked;
    // this.userRepo.addActualRoutine(this.routine.id, checkboxValue);
  }
}
