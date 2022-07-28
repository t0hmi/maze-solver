import { createAction, props } from '@ngrx/store';

const MAZE_KEY = '[MAZE]';

const setMazePixel = createAction(
  `${MAZE_KEY} Set maze pixel width`,
  props<{ width: number; height: number }>()
);

const setMazeIsProcessing = createAction(
  `${MAZE_KEY} Set Maze is processing`,
 props<{isProcessing : boolean}>())
;

const setMazeIsWallsSet = createAction(
  `${MAZE_KEY} set Maze is walls set`,
  props<{isWallsSet : boolean}>()
)

const setMazeMarkers = createAction(
  `${MAZE_KEY} set Maze markers`,
  props<{startCoords : string, finishCoords : string}>()
)

export const MazeAction = {
  setMazePixel,
  setMazeIsProcessing,
  setMazeIsWallsSet,
  setMazeMarkers
};
