import { Component } from '@angular/core';
import { CalendarType } from 'src/app/calendar.type';
import { CalendarService } from 'src/app/service/calendar.service';
import { Store } from '@ngrx/store';
import { Calendar } from 'src/app/redux/reducer/calendar.reducer';

@Component({
  selector: 'app-sub-calender',
  templateUrl: './sub-calender.component.html',
  styleUrls: ['./sub-calender.component.scss'],
})
export class SubCalenderComponent {
  constructor(
    private calendarService: CalendarService,
    private store: Store<{ calendarStore: Calendar }>
  ) {}
  initialMonth = 0;
  calendar: any;
  year = 0;
  month: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  weeks: string[] = [];
  nextMonth() {
    if (this.initialMonth < 11) {
      this.initialMonth += 1;
    }
  }
  backMonth() {
    if (this.initialMonth > 0) {
      this.initialMonth -= 1;
    }
  }
  ngOnInit() {
    this.year = this.calendarService.year;
    this.weeks = this.calendarService.weeks;
    this.store.select('calendarStore').subscribe((data: Calendar) => {
      this.calendar = data.data;
    });
  }
}
