import { createAction, props } from '@ngrx/store';

export const deleteAction = createAction(
  'DeleteAction',
  props<{
    selectedMonth: number;
    selectItemIndex: number;
    objIndex: number;
  }>()
);
