import { Component, OnInit } from '@angular/core';
import { RepoRoutineService } from 'src/app/service/repo.routine.service';
import { StateService } from 'src/app/service/state.service';
import { Routine } from 'src/model/routine.type';

@Component({
  selector: 'GymLogic-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  routines: Routine[];
  constructor(
    private routineRepo: RepoRoutineService,
    private stateService: StateService
  ) {
    this.routines = [];
    this.stateService.state$.subscribe(
      (state) => (this.routines = state.routines)
    );
  }
  ngOnInit(): void {
    this.routineRepo
      .getAll()
      .subscribe((routines) => this.stateService.setRoutines(routines));
  }
  filterRoutines(event: Event) {
    if ((event.target as HTMLSelectElement).value === 'todos') {
      this.routineRepo.getAll().subscribe({
        next: (response) => (this.routines = response),
      });
    } else {
      this.routineRepo
        .filterRoutines('level', (event.target as HTMLSelectElement).value)
        .subscribe({
          next: (response) => (this.routines = response),
        });
    }
  }
}
