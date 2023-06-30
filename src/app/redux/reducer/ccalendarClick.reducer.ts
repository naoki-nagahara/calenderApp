import { createReducer, on } from '@ngrx/store';
import { calendarClickAction } from '../action/click.action';
import { Calendar } from './calendar.reducer';

export const clickData: Calendar = {
  data: {
    clicked: false,
    selectedMonth: '',
    color: '',
    date: 0,
    dayOfWeek: 0,
    schedule: [],
    month: 0,
  },
};
export const clickCalendarReducer = createReducer(
  clickData,
  on(calendarClickAction, (state, { clickData }) => ({
    ...state,
    data: clickData,
  }))
);
