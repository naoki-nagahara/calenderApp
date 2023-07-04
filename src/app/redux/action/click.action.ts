import { createAction, props } from '@ngrx/store';

export const calendarClickAction = createAction(
  'createClickAction',
  props<{ clickData: any; hasClick: boolean }>()
);
