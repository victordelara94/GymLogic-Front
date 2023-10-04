import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepoRoutineService } from 'src/app/service/repo.routine.service';
import { RepoUserService } from 'src/app/service/repo.user.service';
import { StateService } from 'src/app/service/state.service';
import { Routine } from 'src/model/routine.type';
import { Logged, User } from 'src/model/user.type';

@Component({
  selector: 'GymLogic-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  routine!: Routine;
  id!: string;
  message!: string;
  actualUser!: Logged | null;
  constructor(
    private routineRepo: RepoRoutineService,
    private userRepo: RepoUserService,
    private route: ActivatedRoute,
    private stateService: StateService
  ) {
    this.routine = {} as Routine;
    this.stateService.state$.subscribe(
      (data) => (this.actualUser = data.actualUser)
    );
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.routineRepo.getById(this.id).subscribe({
      next: (routine) => (this.routine = routine),
    });
  }
  addUserRoutine() {
    this.userRepo.addActualRoutine(this.routine.id).subscribe({
      next: (user: User) => {
        this.message = 'Rutina añadida a su usuario: ' + this.routine.name;
        this.stateService.updateUser(user);
      },
    });
  }
}
