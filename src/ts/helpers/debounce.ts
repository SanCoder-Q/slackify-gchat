import { Optional } from '../types';

export const debounce = (timeoutMS: number, task: () => void) => {
  let cooldown: Optional<number> = null;
  return () => {
    if (!cooldown) {
      cooldown = setTimeout(() => {
        cooldown = null;
      }, timeoutMS);
      task();
    }
  }
};
