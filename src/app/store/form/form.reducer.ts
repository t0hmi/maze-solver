import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { FormActions } from './form.action';
import { FormState, initialState } from './form.state';

const formReducer = createReducer(
  initialState,
  on(FormActions.openDropdown, (state, { label }) => ({
    ...state,
    activeDropdown: label,
  })),

  on(FormActions.closeDropdown, (state) => ({
    ...state,
    activeDropdown: '',
  })),

  on(FormActions.setSolvingAlgorithm, (state, { solvingAlgorithm }) => ({
    ...state,
    solvingAlgorithm,
  })),

  on(
    FormActions.setMazeGenerationAlgorithm,
    (state, { mazeGenerationAlgorithm }) => ({
      ...state,
      mazeGeneration: mazeGenerationAlgorithm,
    })
  ),

  on(FormActions.setSpeed, (state, { speed }) => ({
    ...state,
    speed,
  }))
);

export function reducer(state: FormState, action: Action) {
  return formReducer(state, action);
}
