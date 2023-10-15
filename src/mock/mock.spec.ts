import { BehaviorSubject, Observable, of } from 'rxjs';
import { StateService } from '../app/service/state.service';
import { Exercise } from '../model/exercise.type';
import { Routine } from '../model/routine.type';
import { Logged, Login, User } from '../model/user.type';
import { State } from '../types/state.type';

export const mockUserRepo: {
  create: () => Observable<User>;
  login: () => Observable<Logged>;
  addActualRoutine: () => Observable<User>;
} = {
  create: () => of(mockUserWithId),
  login: () => of(mockLogged),
  addActualRoutine: () => of(mockUserWithId),
};
export const mockExerciseRepo: {
  create: () => Observable<Exercise>;
  getAll: () => Observable<Exercise[]>;
  getById: () => Observable<Exercise>;
} = {
  create: () => of(mockExercise),
  getAll: () => of(mockExercises),
  getById: () => of(mockExercise),
};
export const mockRoutineRepo: {
  create: () => Observable<Routine>;
  getAll: () => Observable<Routine[]>;
  getById: () => Observable<Routine>;
  delete: () => Observable<void>;
  addExercise: () => Observable<Routine>;
  filterRoutines: () => Observable<Routine[]>;
} = {
  create: () => of(mockRoutine),
  getAll: () => of(mockRoutines),
  getById: () => of(mockRoutine),
  delete: () => of(),
  addExercise: () => of(mockRoutine),
  filterRoutines: () => of(mockRoutines),
};
export const mockStateService: {
  logout: () => void;
  deleteRoutine: (id: string) => void;
  state$: BehaviorSubject<State>;
} = {
  deleteRoutine: (id) => {},
  logout: () => {},

  state$: {
    subscribe: () => {},
  },
} as StateService;

export const mockUserWithId = {} as User;
export const mockLogged = {} as Logged;

export const mockExerciseFormData = {} as FormData;
export const mockLoginData = {} as Login;
export const mockUserNoId = {} as Omit<User, 'id'>;
export const mockRoutine: Routine = {
  id: 'test',

  level: 'avanzado',
  name: 'test',
  objective: 'test',
} as Routine;
export const mockRoutines = [mockRoutine] as Routine[];
export const mockId = '';
export const mockUsers = [] as User[];
export const mockExercise = {} as Exercise;
export const mockExercises = [] as Exercise[];
