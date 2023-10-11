import { Exercise } from './exercise.type';

export type Routine = {
  id: string;
  days: number;
  name: string;
  objective: string;
  level: 'principiante' | 'intermedio' | 'avanzado';
  training: [
    {
      exercisesPerDay: [{ exercise: Exercise; sets: number; reps: number }];
    }
  ];
  isDeprecated: boolean;
};
