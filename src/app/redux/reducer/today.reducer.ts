import { on, createReducer } from '@ngrx/store';
import { getTodayAction } from '../action/today.action';

export interface DataType {
  data: any;
}

export const InitialData: DataType = {
  data: '',
};

export const todayReducer = createReducer(
  InitialData,
  on(getTodayAction, (state, { data: today }) => ({
    ...state,
    data: today,
  }))
);
