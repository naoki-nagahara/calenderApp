import { createReducer, on } from '@ngrx/store';
import { CalendarType } from 'src/app/calendar.type';
import { calendarAction } from '../action/calendar.action';
import { calendarClickAction } from '../action/click.action';
import { updateScheduleAction } from '../action/addSchedule.action';
import { deleteAction } from '../action/delete.action';
import { EditAction } from '../action/edit.action';

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
      console.log('AddReducer');
      console.log(state.data[selectedMonth - 1][ObjIndex].schedule);
      let clone = structuredClone(state);
      clone.data[selectedMonth - 1][ObjIndex].schedule.push(data);
      console.log(clone);
      return clone;
    }
  ),
  on(
    deleteAction,
    (state: { data: any }, { selectedMonth, selectItemIndex, objIndex }) => {
      console.log('DeleteReducer');
      let clone = structuredClone(state);
      clone.data[selectedMonth - 1][objIndex].schedule.splice(
        selectItemIndex,
        1
      );
      return clone;
    }
  ),
  on(
    EditAction,
    (
      state: { data: any },
      { editText, selectedMonth, objIndex, scheduleIndex }
    ) => {
      let clone = structuredClone(state);
      console.log(editText, selectedMonth, objIndex, scheduleIndex);
      clone.data[selectedMonth - 1][objIndex].schedule[scheduleIndex].text =
        editText;
      console.log(clone);
      console.log(clone.data[selectedMonth][objIndex].schedule);
      return clone;
    }
  )
);
