import { Routine } from './routine.type';
import { User } from './user.type';

export type Login = {
  userName: string;
  password: string;
};
export type Trainer = Login & {
  id: string;
  email: string;
  age: number;
  routines: Routine[];
  clients: User[];
};
