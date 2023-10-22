import { Exercise } from './exercise.type';

export type Routine = {
  id: string;
  days: number;
  name: string;
  objective: string;
  level: 'principiante' | 'intermedio' | 'avanzado';

  training: {
    day: number;
    exercisesPerDay: FullExercise[];
  }[];

  isDeprecated: boolean;
};

export type FullExercise = { exercise: Exercise; sets: number; reps: number };
