import { createReducer, on } from '@ngrx/store';
import { FormActions } from './form.action';
import { initialState } from './form.state';

const formReducer = createReducer(
  initialState,
  on(FormActions.openDropdown, (state, { label }) => ({
    ...state,
    activeDropdown: label,
  }))
);
