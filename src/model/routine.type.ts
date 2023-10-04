import { Exercise } from './exercise.type';

export type Routine = {
  id: string;
  name: string;
  objective: string;
  level: 'principiante' | 'intermedio' | 'avanzado';
  exercises: Exercise[];
};
