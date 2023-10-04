import { Component, OnInit } from '@angular/core';
import { RepoRoutineService } from 'src/app/service/repo.routine.service';
import { StateService } from 'src/app/service/state.service';
import { Routine } from 'src/model/routine.type';

@Component({
  selector: 'GymLogic-admin.home',
  templateUrl: './admin.home.component.html',
  styleUrls: ['./admin.home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  routines: Routine[];
  message: string;
  constructor(
    private routineRepo: RepoRoutineService,
    private stateService: StateService
  ) {
    this.message = '';
    this.routines = [];
    this.stateService.state$.subscribe({
      next: (state) => (this.routines = state.routines),
    });
  }
  ngOnInit(): void {
    this.routineRepo
      .getAll()
      .subscribe((routines) => this.stateService.setRoutines(routines));
  }
  deleteRoutine(routineId: Routine['id']) {
    this.routineRepo.delete(routineId).subscribe({
      next: () => {
        this.stateService.deleteRoutine(routineId);
      },
      error: () => {
        this.message = 'Error, rutina no encontrada';
      },
    });
  }
}
