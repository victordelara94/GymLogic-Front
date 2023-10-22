import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Routine } from 'src/model/routine.type';
import { Logged, User } from 'src/model/user.type';
import { State } from 'src/types/state.type';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  state$: BehaviorSubject<State>;

  constructor() {
    const initialState: State = {} as State;
    this.state$ = new BehaviorSubject(initialState);
  }
  getState() {
    return this.state$.asObservable();
  }
  login(data: Logged) {
    this.state$.next({ ...this.state$.value, actualUser: data });
  }

  logout() {
    this.state$.next({ ...this.state$.value, actualUser: null });
  }
  setUsers(data: User[]) {
    this.state$.next({ ...this.state$.value, users: data });
  }
  updateUser(user: User) {
    this.state$.next({
      ...this.state$.value,
      actualUser: { ...this.state$.value.actualUser, user: user } as Logged,
    });
  }
  setRoutines(routines: Routine[]) {
    this.state$.next({ ...this.state$.value, routines });
  }
  deleteRoutine(routineId: Routine['id']) {
    const routines = this.state$.value.routines.filter(
      (routine) => routine.id !== routineId
    );
    this.state$.next({ ...this.state$.value, routines });
  }
  setRoutine(routine: Routine) {
    this.state$.next({ ...this.state$.value, routine });
  }

  setDay(day: number) {
    this.state$.next({ ...this.state$.value, day });
  }
}
