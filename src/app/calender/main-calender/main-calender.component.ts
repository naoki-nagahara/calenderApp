import { Component } from '@angular/core';

@Component({
  selector: 'app-main-calender',
  templateUrl: './main-calender.component.html',
  styleUrls: ['./main-calender.component.scss'],
})
export class MainCalenderComponent {
  week: string[] = ['日', '月', '火', '水', '木', '金', '土'];
  int: number = 32;
  days: number[] = [];
  ngOnInit() {
    for (let i = 1; i < this.int; i++) {
      this.days.push(i);
    }
  }
}
