import { createAction, props } from '@ngrx/store';

export const calendarAction = createAction(
  'createAction',
  props<{ data: any }>()
);
