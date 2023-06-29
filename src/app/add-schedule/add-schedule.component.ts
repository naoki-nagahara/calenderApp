import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarType } from '../calendar.type';
import { calendarAction } from '../redux/action/calendar.action';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss'],
})
export class AddScheduleComponent {
  @Input() sendSchedule?: CalendarType;
  constructor(private store: Store<{ calendarStore: { data: any[] } }>) {}
  addSchedule() {
    let newObj = structuredClone(this.sendSchedule);
    let ObjMonth = newObj?.selectedMonth - 1;
    let ObjIndex = newObj?.date;

    let getCalendar: any;
    let searchIndex = 0;

    this.store.select('calendarStore').subscribe((data) => {
      getCalendar = structuredClone(data);
    });

    searchIndex = getCalendar.data[ObjMonth].findIndex((data: any) => {
      return data.date === ObjIndex || data.selectedMonth === ObjMonth;
    });

    getCalendar.data[ObjMonth][searchIndex].schedule = 'OK';
    console.log(getCalendar);
    this.store.dispatch(calendarAction({ data: getCalendar.data }));
    console.log(getCalendar.data);
  }
  ngOnInit() {
    console.log(this.sendSchedule);
  }
}
