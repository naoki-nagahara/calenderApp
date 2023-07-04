import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, Subscription } from 'rxjs';
import { CalendarType } from 'src/app/calendar.type';
import { deleteAction } from 'src/app/redux/action/delete.action';
import { EditAction } from 'src/app/redux/action/edit.action';
import { Calendar } from 'src/app/redux/reducer/calendar.reducer';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnDestroy {
  schedule?: any = '';
  selectedMonth = 0;
  selectedDay = 0;
  AllCalendar: any;
  objIndex?: number;
  subscription?: Subscription;
  editText = '';
  isFocus: boolean = false;

  constructor(
    private store: Store<{
      calenderClickStore: Calendar;
      toDayStore: Calendar;
      calendarStore: Calendar;
    }>
  ) {}
  ngOnDestroy() {
    console.log('破棄');
    this.subscription?.unsubscribe();
  }
  toDayToggle() {
    this.store.select('toDayStore').subscribe((data: { data: any }) => {
      console.log('初回');
      this.schedule = data.data;
      this.selectedMonth = data.data.selectedMonth;
    });
    console.log(this.selectedMonth);
  }
  showClickSchedule() {
    this.store.select('calenderClickStore').subscribe((clickData: Calendar) => {
      console.log('クリック');
      this.selectedMonth = clickData.data.selectedMonth;
      this.selectedDay = clickData.data.date;
      this.subscription = this.store
        .select('calendarStore')
        .pipe(take(3))
        .subscribe((data: any) => {
          console.log(1);
          console.log('RUN');
          if (this.selectedMonth) {
            this.objIndex = data.data[this.selectedMonth - 1].findIndex(
              (obj: CalendarType) => {
                return (
                  obj.date === this.selectedDay &&
                  obj.selectedMonth === this.selectedMonth
                );
              }
            );
            this.schedule = data.data[this.selectedMonth - 1][this.objIndex!];
          }
        });
    });
  }
  editFunction(item: string, i: number) {
    console.log('HELLO');
    console.log(item, i);
    if (item !== '') {
      this.store.dispatch(
        EditAction({
          editText: item,
          selectedMonth: this.selectedMonth,
          objIndex: this.objIndex!,
          scheduleIndex: i,
        })
      );
    }
  }

  deleteItem(i: number) {
    console.log('削除');
    this.store.dispatch(
      deleteAction({
        selectedMonth: this.selectedMonth,
        selectItemIndex: i,
        objIndex: this.objIndex!,
      })
    );
  }
  ngOnInit() {
    console.log(this.isFocus);
    this.toDayToggle();
    this.showClickSchedule();
  }
}
