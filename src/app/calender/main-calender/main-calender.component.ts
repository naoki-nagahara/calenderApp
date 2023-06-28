import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CalendarType } from 'src/app/calendar.type';
import { CalendarService } from 'src/app/service/calendar.service';
import { Store } from '@ngrx/store';
import { calendarAction } from 'src/app/redux/action/calendar.action';

import * as dayjs from 'dayjs';

@Component({
  selector: 'app-main-calender',
  templateUrl: './main-calender.component.html',
  styleUrls: ['./main-calender.component.scss'],
})
export class MainCalenderComponent {
  constructor(
    private calendarService: CalendarService,
    private store: Store<{ calendarStore: any }>
  ) {}

  month: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  weeks: string[] = ['日', '月', '火', '水', '木', '金', '土'];
  year = 2022;
  a: any;
  calendar: any[] = [
    {
      color: '',
      dayOfWeek: 0,
      month: 0,
      date: 0,
      schedule: '',
    },
  ];

  getData(el: any) {
    console.log(el);
  }
  getYearDates(year: number) {
    const startDate = dayjs(`${year}-01-01`);
    const endDate = dayjs(`${year}-12-31`);
    // const months: { [month: string]: Object[] }  ={}
    let months: any = {};
    let currentDate = startDate;
    while (
      currentDate.isBefore(endDate) ||
      currentDate.isSame(endDate, 'day')
    ) {
      const month = currentDate.format('M');
      const week = currentDate.day();
      const date = currentDate.format('D');
      if (!months[month]) {
        months[month] = [];
      }
      months[month].push({
        month: currentDate,
        date: date,
        week: week,
        schedule: 'OK',
        color: '',
      });
      currentDate = currentDate.add(1, 'day');
    }
    console.log(months);
    return months;
  }

  ngOnInit() {
    this.calendarService.getCalendar().subscribe((data: CalendarType[]) => {
      this.calendar = data;
      console.log(data, 'dispatch');
      this.store.dispatch(calendarAction({ data: data }));
    });
    let a = this.getYearDates(2022);
    let lengthIndex = a[1].length;
    let lastB = a[1][lengthIndex - 1];
    console.log(lastB);
    let oo = lastB.month.add(5, 'day');
    console.log(oo);
    console.log(lastB);
    let b = a[1][0];
    console.log(b);
    let weekIndex = b.month.day();
    console.log(weekIndex);
    let startDay = b.month.subtract(weekIndex, 'day');
    console.log(startDay);
    //
    // let endDay = b.month.subtract(1, 'day');
    // let cur = startDay.format('YYYY-MM-DD');
    // let end = endDay.format('YYYY-MM-DD');
    // console.log(startDay.day() + endDay.day() + 1);
    // let newOBJ: any = {};

    // while (cur.isBefore(end) || cur.isSame(end, 'day')) {
    //   const month = cur.format('M');
    //   const week = cur.day();
    //   const date = cur.format('D');
    //   if (!newOBJ[month]) {
    //     newOBJ[month] = [];
    //   }
    //   newOBJ[month].push({
    //     month: cur,
    //     date: date,
    //     week: week,
    //   });
    //   cur = cur.add(1, 'day');
    //   return cur;
    // }
  }
}

//月で分けて、最初の値と最後のweek分、前の月と最後の月から取得

//初月のWEEKを取得して、そのWEEK分前の月の日付を取得する。

//末月はその逆
