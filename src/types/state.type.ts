import { FullExercise, Routine } from 'src/model/routine.type';
import { Logged, User } from 'src/model/user.type';

export type State = {
  users: User[];
  actualUser: Logged | null;
  routines: Routine[];
  filteredRoutines: Routine[];
  routine: Routine;
  fullExercise: FullExercise;
  day: number;
};
