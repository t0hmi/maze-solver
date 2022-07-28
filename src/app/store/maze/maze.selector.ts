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

const selectMazeIsProcessing = createSelector(
  selectMaze,
  (state: MazeState) => state.isProcessing
)

const selectMazeIsWallsSet = createSelector(
  selectMaze,
  (state: MazeState) => state.isWallsSet
)

const selectMarkersCoords = createSelector(
  selectMaze,
  (state : MazeState) => [state.startCoords, state.finishCoords]
)

export const MazeSelector = {
  selectMazeWidth,
  selectMazeHeight,
  selectMazeIsProcessing,
  selectMazeIsWallsSet,
  selectMarkersCoords
};
