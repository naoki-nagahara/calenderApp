import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  calendar: any;
  constructor(
    private s: CalendarService,
    private store: Store<{ calendarStore: CalendarType; toDayStore: any }>
  ) {}
  ngOnInit() {
    console.log('今日の日付を取得する');
    const month: any = dayjs().format('M');
    const today = dayjs();
    let monthIndex = Number(month - 1);
    this.s.joinDays().subscribe((data) => {
      this.store.dispatch(calendarAction({ data: data }));
      console.log(data);
      const matchedObject = data[monthIndex].find((obj: any) =>
        obj.month.isSame(today, 'day')
      );
      console.log(matchedObject);
      this.store.dispatch(getTodayAction({ data: matchedObject }));
    });
    console.log(month);
  }
}
