import { createAction, props } from '@ngrx/store';

export const calendarAction = createAction(
  'createInitialAction',
  props<{ data: any }>()
);
