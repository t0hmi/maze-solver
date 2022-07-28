import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { MazeAction } from './maze.action';
import { initialState, MazeState } from './maze.state';

const mazeReducer = createReducer(
  initialState,
  on(MazeAction.setMazePixel, (state, { width, height }) => ({
    ...state,
    pixelWidth: width,
    pixelHeight: height,
  })),

  on(MazeAction.setMazeIsProcessing, (state, {isProcessing}) => ({
    ...state,
    isProcessing
  })),

  on(MazeAction.setMazeIsWallsSet, (state, { isWallsSet}) => ({
    ...state,
    isWallsSet
  })),

  on(MazeAction.setMazeMarkers, (state, {startCoords, finishCoords}) => ({
    ...state,
    startCoords,
    finishCoords
  }))
);

export function reducer(state: MazeState, action: Action) {
  return mazeReducer(state, action);
}
