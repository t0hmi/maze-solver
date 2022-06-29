import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormState } from './form.state';

const selectForm = createFeatureSelector<FormState>('form');

const selectActiveDropdown = createSelector(
  selectForm,
  (state: FormState) => state.activeDropdown
);

export const FormSelector = {
  selectForm,
  selectActiveDropdown,
};
