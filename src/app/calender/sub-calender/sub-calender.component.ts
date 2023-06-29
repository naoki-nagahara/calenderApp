import { Component } from '@angular/core';
import { CalendarType } from 'src/app/calendar.type';
import { CalendarService } from 'src/app/service/calendar.service';

@Component({
  selector: 'app-sub-calender',
  templateUrl: './sub-calender.component.html',
  styleUrls: ['./sub-calender.component.scss'],
})
export class SubCalenderComponent {
  constructor(private calendarService: CalendarService) {}
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
    // this.month = this.calendarService.month;
    this.weeks = this.calendarService.weeks;
    this.calendarService.joinDays().subscribe((data: CalendarType) => {
      this.calendar = data;
      console.log(data, 'OK');
    });
  }
}
