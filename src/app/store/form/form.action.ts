import { createAction, props } from '@ngrx/store';
import { MazeGenerationAlgorithm, SolvingAlgorithm, Speed } from './form.state';

const FORM_KEY = '[Form]';

const openDropdown = createAction(
  `${FORM_KEY} Open Dropdown`,
  props<{ label: string }>()
);

const closeDropdown = createAction(`${FORM_KEY} Close Dropdown`);

const setSolvingAlgorithm = createAction(
  `${FORM_KEY} Set new solving algorithm value`,
  props<{ solvingAlgorithm: SolvingAlgorithm }>()
);

const setMazeGenerationAlgorithm = createAction(
  `${FORM_KEY} Set new maze generation algorithm`,
  props<{ mazeGenerationAlgorithm: MazeGenerationAlgorithm }>()
);

const setSpeed = createAction(
  `${FORM_KEY} Set new speed`,
  props<{ speed: Speed }>()
);

export const FormActions = {
  openDropdown,
  closeDropdown,
  setSolvingAlgorithm,
  setMazeGenerationAlgorithm,
  setSpeed,
};
