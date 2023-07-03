import { createAction, props } from '@ngrx/store';

export const updateScheduleAction = createAction(
  'addSchedule',
  props<{
    data: any;
    selectedMonth: number;
    ObjIndex: number;
  }>()
);
