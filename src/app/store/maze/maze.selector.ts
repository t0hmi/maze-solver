import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MazeState } from './maze.state';

const selectMaze = createFeatureSelector<MazeState>('maze');

const selectMazeWidth = createSelector(
  selectMaze,
  (state: MazeState) => state.pixelWidth
);

const selectMazeHeight = createSelector(
  selectMaze,
  (state: MazeState) => state.pixelHeight
);

export const MazeSelector = {
  selectMazeWidth,
  selectMazeHeight,
};
