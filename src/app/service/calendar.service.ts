import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store/src';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  viewMonth: any = [];
  calendar: any = [];
  nowDate!: number;
  nowMonth!: number;
  nowDay!: number;
  nowWeek!: number;
  year = 2023;
  startMonth = 1;
  endMonth = 12;
  emptyObj = {
    dayOfWeek: null,
    date: null,
    month: null,
    style: false,
  };
  month: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  weeks: string[] = ['日', '月', '火', '水', '木', '金', '土'];
  constructor() {}
  getYearDates(year: number) {
    this.calendar = [];
    const startDate = dayjs(`${year}-01-01`);
    const endDate = dayjs(`${year}-12-31`);
    let currentDate = startDate;
    const today = dayjs();

    while (
      currentDate.isBefore(endDate) ||
      currentDate.isSame(endDate, 'day')
    ) {
      const month = currentDate.format('M');
      const week = currentDate.day();
      const date = currentDate.format('D');
      if (!this.calendar[month]) {
        this.calendar[month] = [];
      }
      this.calendar[month].push({
        special: currentDate.day() === 0 ? true : false,
        today: currentDate.isSame(today, 'day') ? true : false,
        clicked: false,
        selectedMonth: currentDate.format('M'),
        month: currentDate,
        date: date,
        week: week,
        schedule: [
          // {
          //   text: '奈良帰省',
          //   color: '',
          // },
          // {
          //   text: '１９時からジム',
          //   color: '',
          // },
        ],
      });
      currentDate = currentDate.add(1, 'day');
    }
    return this.calendar;
  }

  joinDays(): Observable<any> {
    console.log('Service呼び出し');
    this.getYearDates(2023);
    this.viewMonth = [];
    for (let i = 1; i <= 12; i++) {
      let month1 = this.calendar[i];
      let month1First = month1[0];
      let backMoth = month1First.month.subtract(month1First.month.day(), 'day');
      let month1Index = month1.length;
      let monthLast = month1[month1Index - 1];
      let nextMonth = monthLast.month.add(6 - monthLast.month.day(), 'day');
      //末日の曜日数字を取得して、来月の月から曜日数字分後から曜日数字分取得する
      for (let i = 5 - monthLast.month.day(); i >= 0; i--) {
        const date = nextMonth.subtract(i, 'day');
        let week = date.day();
        let day = date.format('D');
        let newOBj = {
          empty: true,
          date: day,
          week: '',
          schedule: '',
          color: '',
          style: false,
        };
        month1.push(newOBj);
      }
      //初月の曜日数字を取得して、その前の月から曜日数字分前から曜日数字分取得する
      for (let i = month1First.month.day() - 1; i >= 0; i--) {
        const date = backMoth.add(i, 'day');
        let week = date.day();
        let day = date.format('D');
        let newOBj = {
          empty: true,
          month: date,
          date: day,
          week: '',
          schedule: '',
          color: '',
          style: false,
        };
        month1.unshift(newOBj);
      }
      this.viewMonth.push(month1);
    }
    return of(this.viewMonth);
  }
}
