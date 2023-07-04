import { createAction, props } from '@ngrx/store';

export const EditAction = createAction(
  'EditAction',
  props<{
    editText: string;
    selectedMonth: number;
    objIndex: number;
    scheduleIndex: number;
  }>()
);
