import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, of, switchMap } from 'rxjs';
import { CalendarType } from 'src/app/calendar.type';
import { calendarAction } from 'src/app/redux/action/calendar.action';
import { Calendar } from 'src/app/redux/reducer/calendar.reducer';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent {
  isShow = true;
  schedule?: any = '';
  selectedMonth = 7;
  selectedDay = 0;
  AllCalendar: any;
  objIndex: any;

  constructor(
    private store: Store<{
      calenderClickStore: Calendar;
      toDayStore: any;
      calendarStore: any;
    }>
  ) {}
  toDayToggle() {
    this.store
      .select('toDayStore')
      .pipe(first())
      .subscribe((data: { data: any }) => {
        console.log('初回');
        this.schedule = data.data;
        this.selectedMonth = data.data.selectedMonth;
      });
  }
  showClickSchedule() {
    console.log('発火');
    this.store.select('calenderClickStore').subscribe((clickData: Calendar) => {
      this.selectedMonth = clickData.data.selectedMonth;
      this.selectedDay = clickData.data.date;
      this.store.select('calendarStore').subscribe((data) => {
        if (data.data[this.selectedMonth - 1]) {
          console.log('発火');
          this.objIndex = data.data[this.selectedMonth - 1].findIndex(
            (obj: any) => {
              return (
                obj.date === this.selectedDay &&
                obj.selectedMonth === this.selectedMonth
              );
            }
          );
          console.log(this.objIndex);
          this.schedule = data.data[this.selectedMonth - 1][this.objIndex];
        }
      });
    });
  }

  deleteItem(i: number) {}
  ngOnInit() {
    this.showClickSchedule();
    this.toDayToggle();
    console.log(this.selectedDay, this.selectedMonth, this.objIndex);
  }
}
