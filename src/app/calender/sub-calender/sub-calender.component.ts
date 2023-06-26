import { Component } from '@angular/core';

@Component({
  selector: 'app-sub-calender',
  templateUrl: './sub-calender.component.html',
  styleUrls: ['./sub-calender.component.scss'],
})
export class SubCalenderComponent {
  month: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  week: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  int: number = 32;
  days: number[] = [];
  ngOnInit() {
    for (let i = 1; i < this.int; i++) {
      this.days.push(i);
    }
  }
}
// <!-- 1月 / January / Jan.
// 2月 / February / Feb.
// 3月 / March / Mar.
// 4月 / April / Apr.
// 5月 / May / May
// 6月 / June / Jun.
// 7月 / July / Jul.
// 8月 / August / Aug.
// 9月 / September / Sep. or Sept.
// 10月 / October / Oct.
// 11月 / November / Nov.
// 12月 / December / Dec. -->
// 月曜日	Monday	Mon.
// 火曜日	Tuesday	Tue./Tu./Tues.
// 水曜日	Wednesday	Wed.
// 木曜日	Thursday	Thu./Th./Thur./Thurs.
// 金曜日	Friday	Fri.
// 土曜日	Saturday	Sat.
// 日曜日	Sunday	Sun.
