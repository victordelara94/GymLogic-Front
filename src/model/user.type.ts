import { Routine } from './routine.type';

export type Login = {
  userName: string;
  password: string;
};
export type User = Login & {
  id: string;
  userName: string;
  email: string;
  age: number;
  height: number;
  weight: number;
  actualRoutine: Routine;
  role: 'admin' | 'user';
};
export type Logged = {
  user: User;
  token: string;
};
