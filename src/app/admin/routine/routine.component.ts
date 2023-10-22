import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepoRoutineService } from 'src/app/service/repo.routine.service';
import { StateService } from 'src/app/service/state.service';
import { Routine } from 'src/model/routine.type';

@Component({
  selector: 'GymLogic-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss'],
})
export class RoutineComponent implements OnInit {
  id: Routine['id'];
  routine!: Routine;
  errorMessage: string = '';
  isOpen: boolean;
  constructor(
    private routineRepo: RepoRoutineService,
    private route: ActivatedRoute,
    private stateService: StateService
  ) {
    this.isOpen = false;
    this.id = this.route.snapshot.paramMap.get('id')!;
  }
  ngOnInit(): void {
    this.routineRepo.getById(this.id).subscribe({
      next: (routine) => {
        this.routine = routine;
        this.stateService.setRoutine(routine);
      },
      error: () => (this.errorMessage = 'Rutina no encontrada'),
    });
    this.stateService.getState().subscribe({
      next: (state) => {
        this.routine = state.routine;
      },
    });
  }

  openModal(day: number) {
    this.isOpen = true;
    this.stateService.setDay(day);
  }

  closeModal(ev: boolean) {
    this.isOpen = ev;
  }
}
