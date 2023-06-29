import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CalendarType } from 'src/app/calendar.type';
import { CalendarService } from 'src/app/service/calendar.service';
import { Store } from '@ngrx/store';
import { calendarAction } from 'src/app/redux/action/calendar.action';

@Component({
  selector: 'app-main-calender',
  templateUrl: './main-calender.component.html',
  styleUrls: ['./main-calender.component.scss'],
})
export class MainCalenderComponent {
  constructor(
    private calendarService: CalendarService,
    private store: Store<{ calendarStore: CalendarType }>
  ) {}
  month: number[] = [];
  weeks: string[] = [];
  year!: number;
  viewMonth: any = [];
  sendSchedule!: CalendarType;
  clickedItem = false;
  selectedItem!: CalendarType;

  getData(el: CalendarType) {
    if (el.empty === true) return;
    this.selectedItem = el;
    this.sendSchedule = el;
  }

  ngOnInit() {
    this.year = this.calendarService.year;
    this.month = this.calendarService.month;
    this.weeks = this.calendarService.weeks;

    this.calendarService.joinDays().subscribe((data: CalendarType) => {
      console.log(data);
      this.viewMonth = data;
      // this.store.dispatch(calendarAction({ data: data }));
    });
  }
}
