import { createAction, props } from '@ngrx/store';

export const getTodayAction = createAction(
  'getToDayAction',
  props<{ data: any }>()
);
