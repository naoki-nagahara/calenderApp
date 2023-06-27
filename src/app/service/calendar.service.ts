import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
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
  constructor() {}
  getCalendar() {
    const now = new Date();
    this.nowDay = now.getDate();
    this.nowMonth = now.getMonth();
    this.nowWeek = now.getDay();

    for (let month = this.startMonth; month <= this.endMonth; month++) {
      const startDate = new Date(this.year, month - 1, 1);
      const endDate = new Date(this.year, month, 0);
      const monthCalendar: any = [];

      for (let date = startDate.getDate(); date <= endDate.getDate(); date++) {
        const currentDate = new Date(this.year, month - 1, date);
        const dayOfWeekIndex = currentDate.getDay();
        monthCalendar.push({
          dayOfWeek: dayOfWeekIndex,
          date: date,
          month: month,
        });
      }
      this.calendar.push(monthCalendar);
    }
    for (let i = 0; i < this.calendar.length; i++) {
      //a回先頭にオブジェクトをいれる。
      let a = this.calendar[i][0].dayOfWeek;
      for (let j = 0; j < a; j++) {
        this.calendar[i].unshift(this.emptyObj);
      }
    }
    let newCalender = [...this.calendar[this.nowMonth]];
    let nowObj = newCalender.filter((data: any) => data.date === this.nowDay);
    Object.assign(nowObj[0], { nowDate: true });
  }
}
