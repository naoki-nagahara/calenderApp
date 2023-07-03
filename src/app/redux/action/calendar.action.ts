import { createAction, props } from '@ngrx/store';
import { CalendarType } from 'src/app/calendar.type';

export const calendarAction = createAction(
  'createInitialAction',
  props<{ data: any }>()
);
