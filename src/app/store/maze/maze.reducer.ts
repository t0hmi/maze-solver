import { Action, createReducer, on } from '@ngrx/store';
import { MazeAction } from './maze.action';
import { initialState, MazeState } from './maze.state';

const mazeReducer = createReducer(
  initialState,
  on(MazeAction.setMazePixel, (state, { width, height }) => ({
    ...state,
    pixelWidth: width,
    pixelHeight: height,
  }))
);

export function reducer(state: MazeState, action: Action) {
  return mazeReducer(state, action);
}
