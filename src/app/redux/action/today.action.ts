import { createAction, props } from '@ngrx/store';
import { Calendar } from '../reducer/calendar.reducer';

export const getTodayAction = createAction(
  'getToDayAction',
  props<{ data: Calendar }>()
);
