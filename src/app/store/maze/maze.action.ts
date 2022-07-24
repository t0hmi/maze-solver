import { createAction, props } from '@ngrx/store';

const MAZE_KEY = '[MAZE]';

const setMazePixel = createAction(
  `${MAZE_KEY} Set maze pixel width`,
  props<{ width: number; height: number }>()
);

export const MazeAction = {
  setMazePixel,
};
