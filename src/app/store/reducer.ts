import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { State } from './state';
import * as FormReducer from './form/form.reducer';
import * as MazeReducer from './maze/maze.reducer';

export const reducers: ActionReducerMap<State> = {
  form: FormReducer.reducer,
  maze: MazeReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];
