import { CSP_NONCE, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarType } from '../calendar.type';
import { calendarAction } from '../redux/action/calendar.action';
import * as dayjs from 'dayjs';

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
      calendarStore: { data: any[] };
      calenderClickStore: { data: any };
    }>
  ) {}
  clickColor(color: string) {
    this.selectedColor = color;
  }
  addSchedule() {
    const current = this.sendSchedule;
    const month = this.sendSchedule.selectedMonth;
    if (this.formText.length) {
      this.store.select('calendarStore').subscribe((data) => {
        this.list = structuredClone(data.data);
      });
      let DayIndex = this.list[month - 1].findIndex((obj: any) => {
        return (
          obj.date === current.date &&
          obj.selectedMonth === current.selectedMonth
        );
      });
      console.log(DayIndex);
      let newObj = {
        text: this.formText,
        color: this.selectedColor,
      };
      this.list[month - 1][DayIndex].color = this.selectedColor;
      this.list[month - 1][DayIndex].schedule.push(newObj);
      this.formText = '';
      this.store.dispatch(calendarAction({ data: this.list }));
    }
  }

  ngOnInit() {
    console.log(this.sendSchedule);
  }
}
