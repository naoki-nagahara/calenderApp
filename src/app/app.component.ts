import { Component } from '@angular/core';
import { CalendarService } from './service/calendar.service';
import { Store } from '@ngrx/store';
import { CalendarType } from './calendar.type';
import { calendarAction } from './redux/action/calendar.action';
import * as dayjs from 'dayjs';
import { getTodayAction } from './redux/action/today.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  calendar: any;
  constructor(
    private s: CalendarService,
    private store: Store<{ calendarStore: CalendarType; toDayStore: any }>
  ) {}
  ngOnInit() {
    const month: any = dayjs().format('M');
    let monthIndex = Number(month - 1);
    let sendToDay!: any;
    const today = dayjs();
    console.log(today);
    this.s.joinDays().subscribe((data) => {
      this.store.dispatch(calendarAction({ data: data }));
      console.log('AppComponent');
      console.log(data);
      const matchedObject = data[monthIndex].find((obj: any) =>
        obj.month.isSame(today, 'day')
      );
      this.store.dispatch(getTodayAction({ data: matchedObject }));
    });
    console.log(month);
  }
}
