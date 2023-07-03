import { createAction, props } from '@ngrx/store';

export const deleteAction = createAction(
  'DeleteAction',
  props<{ data: any; selectedMonth: number; selectedDate: number }>()
);
