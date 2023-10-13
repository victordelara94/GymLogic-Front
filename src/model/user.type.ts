import { Routine } from './routine.type';
import { Trainer } from './trainer.type';

export type Login = {
  userName: string;
  password: string;
};
export type User = Login & {
  id: string;
  role: 'admin' | 'user';
  email: string;
  age: number;
  height: number;
  weight: number;
  actualRoutine: { routine: Routine | null; isCompleted: boolean };
  actualTrainer: Trainer | null;
  completedRoutines: Routine[];
};
export type Logged = {
  user: User;
  token: string;
};
