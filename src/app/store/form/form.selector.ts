import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormState } from './form.state';

const selectForm = createFeatureSelector<FormState>('form');

const selectActiveDropdown = createSelector(
  selectForm,
  (state: FormState) => state.activeDropdown
);

const selectMazeGeneration = createSelector(
  selectForm,
  (state: FormState) => state.mazeGeneration
);

const selectSolvingAlgorithm = createSelector(
  selectForm,
  (state: FormState) => state.solvingAlgorithm
);

const selectSpeed = createSelector(
  selectForm,
  (state: FormState) => state.speed
);

export const FormSelector = {
  selectForm,
  selectActiveDropdown,
  selectMazeGeneration,
  selectSolvingAlgorithm,
  selectSpeed,
};
