import { Component, EventEmitter, Output } from '@angular/core';

/**
 * @title Menu with icons
 */
@Component({
  selector: 'GymLogic-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  @Output() logOut: EventEmitter<boolean>;
  @Output() userRoutine: EventEmitter<boolean>;
  @Output() profile: EventEmitter<boolean>;
  constructor() {
    this.logOut = new EventEmitter();
    this.userRoutine = new EventEmitter();
    this.profile = new EventEmitter();
  }
  emitLogout() {
    this.logOut.emit(true);
  }
  emitRoutine() {
    this.userRoutine.emit(true);
  }
  emitProfile() {
    this.profile.emit(true);
  }
}
function output(): (target: MenuComponent, propertyKey: 'event') => void {
  throw new Error('Function not implemented.');
}
