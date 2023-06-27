import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CalendarService } from 'src/app/service/calendar.service';

@Component({
  selector: 'app-main-calender',
  templateUrl: './main-calender.component.html',
  styleUrls: ['./main-calender.component.scss'],
})
export class MainCalenderComponent {
  constructor(private calendarService: CalendarService) {}

  month: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  weeks: string[] = ['日', '月', '火', '水', '木', '金', '土'];
  year = 2023;
  calendar: any = [];

  ngOnInit() {
    this.calendarService.getCalendar();
    this.calendar = this.calendarService.calendar;
  }
}
