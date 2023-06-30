import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { CalendarType } from 'src/app/calendar.type';
import { Calendar } from 'src/app/redux/reducer/calendar.reducer';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent {
  isShow = true;
  schedule?: any = '';

  constructor(
    private store: Store<{
      calenderClickStore: Calendar;
      toDayStore: any;
      calendarStore: any;
    }>
  ) {}
  deleteItem() {
    console.log('DELETE');
  }
  ngOnInit() {
    this.store.select('calenderClickStore').subscribe((clickData: Calendar) => {
      let month = clickData.data.selectedMonth;
      let day = clickData.data.date;
      let getmonth = clickData.data.selectedMonth;

      this.store.select('calendarStore').subscribe((data) => {
        console.log(this.schedule, 'うんでふぁ！');

        if (data.data[month - 1]) {
          let dayIndex = data.data[month - 1].findIndex((obj: any) => {
            return obj.date === day && obj.selectedMonth === getmonth;
          });
          this.schedule = data.data[month - 1][dayIndex];
          console.log(this.schedule, 'うんでふぁ！');
        }
      });
    });
    this.store
      .select('toDayStore')
      .pipe(first())
      .subscribe((data: { data: Calendar }) => {
        console.log('初回');
        this.schedule = data.data;
      });
    console.log(this.schedule.length, 'うんでふぁ！');
  }
}
