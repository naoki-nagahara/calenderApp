import { createReducer, on } from '@ngrx/store';
import { CalendarType } from 'src/app/calendar.type';
import { calendarAction } from '../action/calendar.action';
import { calendarClickAction } from '../action/click.action';
import { updateScheduleAction } from '../action/addSchedule.action';

export interface Calendar {
  data: CalendarType;
}

export const initialState: Calendar = {
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

export const calendarReducer = createReducer(
  initialState,
  on(calendarAction, (state, { data }) => ({
    ...state,
    data: data,
  })),
  on(
    updateScheduleAction,
    (state: { data: any }, { data, selectedMonth, ObjIndex }) => {
      console.log(state.data[selectedMonth - 1][ObjIndex].schedule);
      let clone = structuredClone(state);
      clone.data[selectedMonth - 1][ObjIndex].schedule.push(data);
      console.log(clone);
      return clone;
    }
  )
);
