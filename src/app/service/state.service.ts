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

  login(data: Logged) {
    this.state$.next({ ...this.state$.value, actualUser: data });
  }

  logout() {
    this.state$.next({ ...this.state$.value, actualUser: null });
  }
  setUsers(data: User[]) {
    this.state$.next({ ...this.state$.value, users: data });
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
  setActualRoutine(actualRoutine: Routine) {
    this.state$.next({ ...this.state$.value, actualRoutine });
  }
  updateUser(user: User) {
    this.state$.next({
      ...this.state$.value,
      actualUser: { ...this.state$.value.actualUser, user: user } as Logged,
    });
  }
}
