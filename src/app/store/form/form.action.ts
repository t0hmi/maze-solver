import { createAction, props } from '@ngrx/store';

const FORM_KEY = '[Form]';

const openDropdown = createAction(
  `${FORM_KEY} Open Dropdown`,
  props<{ label: string }>()
);

const closeDropdown = createAction(`${FORM_KEY} Close Dropdown`);

export const FormActions = {
  openDropdown,
  closeDropdown,
};
