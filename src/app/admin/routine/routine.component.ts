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
  day!: number;
  routine!: Routine;
  errorMessage: string = '';
  isOpen: boolean;
  constructor(
    private routineRepo: RepoRoutineService,
    private route: ActivatedRoute
  ) {
    this.isOpen = false;
    this.id = this.route.snapshot.paramMap.get('id')!;
  }
  ngOnInit(): void {
    this.routineRepo.getById(this.id).subscribe({
      next: (resp) => (this.routine = resp),
      error: () => (this.errorMessage = 'Rutina no encontrada'),
    });
  }

  openModal(day: number) {
    this.isOpen = true;
    this.day = day;
  }
  closeModal(ev: boolean) {
    this.isOpen = ev;
  }
}
