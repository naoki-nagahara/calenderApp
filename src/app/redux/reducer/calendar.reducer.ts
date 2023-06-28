import { createReducer, on } from '@ngrx/store';
import { CalendarType } from 'src/app/calendar.type';
import { calendarAction } from '../action/calendar.action';

interface Calendar {
  data: CalendarType;
}

export const initialState: Calendar = {
  data: {
    color: '',
    date: 0,
    dayOfWeek: 0,
    schedule: '',
    month: 0,
  },
};

export const calendarReducer = createReducer(
  initialState,
  on(calendarAction, (state, { data }) => ({
    ...state,
    data: data,
  }))
);
