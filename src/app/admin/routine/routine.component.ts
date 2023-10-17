import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepoRoutineService } from 'src/app/service/repo.routine.service';
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
  days: {}[] = [];
  constructor(
    private routineRepo: RepoRoutineService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }
  ngOnInit(): void {
    this.routineRepo.getById(this.id).subscribe({
      next: (resp) => (this.routine = resp),
      error: () => (this.errorMessage = 'Rutina no encontrada'),
    });
  }
  createTrainingArray(day: number) {
    const emptyArray = Array.from({ length: day }, () => ({}));
    this.days = emptyArray;
  }
}
