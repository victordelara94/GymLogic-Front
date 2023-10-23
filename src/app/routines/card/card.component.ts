import { Component, Input } from '@angular/core';
import { Routine } from 'src/model/routine.type';

@Component({
  selector: 'GymLogic-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() routine!: Routine;
  constructor() {
    this.routine = {} as Routine;
  }
}
