import { ImgData } from 'src/types/image.type';

export type Exercise = {
  id: string;
  name: string;
  image: ImgData;
  sets: number;
  reps: number;
};
