import { CSP_NONCE, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarType } from '../calendar.type';
import { calendarAction } from '../redux/action/calendar.action';
import * as dayjs from 'dayjs';
import { updateScheduleAction } from '../redux/action/addSchedule.action';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss'],
})
export class AddScheduleComponent {
  @Input() sendSchedule!: CalendarType;
  viewSchedule!: CalendarType;
  formText: string = '';
  list: any;
  selectedColor: string = '';

  constructor(
    private store: Store<{
      calendarStore: { data: CalendarType[] };
      calenderClickStore: { data: CalendarType };
    }>
  ) {}
  clickColor(color: string) {
    this.selectedColor = color;
  }
  addSchedule() {
    const current = this.sendSchedule;
    const month = this.sendSchedule.selectedMonth;
    console.log(current, month);
    if (this.formText.length) {
      this.store.select('calendarStore').subscribe((data) => {
        this.list = structuredClone(data.data);
      });
      let dayIndex: number = this.list[month - 1].findIndex(
        (obj: CalendarType) => {
          return (
            obj.date === current.date &&
            obj.selectedMonth === current.selectedMonth
          );
        }
      );
      let newObj = {
        text: this.formText,
        color: this.selectedColor,
      };
      this.store.dispatch(
        updateScheduleAction({
          data: newObj,
          selectedMonth: month,
          ObjIndex: dayIndex,
        })
      );
      this.formText = '';
    }
  }

  ngOnInit() {
    console.log(this.sendSchedule);
  }
}
