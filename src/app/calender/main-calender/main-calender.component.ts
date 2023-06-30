import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CalendarType } from 'src/app/calendar.type';
import { CalendarService } from 'src/app/service/calendar.service';
import { Store, select } from '@ngrx/store';
import { calendarAction } from 'src/app/redux/action/calendar.action';
import { Calendar } from 'src/app/redux/reducer/calendar.reducer';
import { calendarClickAction } from 'src/app/redux/action/click.action';
import { clickCalendarReducer } from 'src/app/redux/reducer/ccalendarClick.reducer';

@Component({
  selector: 'app-main-calender',
  templateUrl: './main-calender.component.html',
  styleUrls: ['./main-calender.component.scss'],
})
export class MainCalenderComponent {
  constructor(
    private calendarService: CalendarService,
    private store: Store<{
      calendarStore: Calendar;
      calenderClickStore: Calendar;
    }> // private ItemStore: Store<{ calenderClickStore: Calendar }>
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
    console.log(el);
    this.store.dispatch(calendarClickAction({ clickData: el }));
  }

  ngOnInit() {
    this.year = this.calendarService.year;
    this.month = this.calendarService.month;
    this.weeks = this.calendarService.weeks;
    this.store.select('calendarStore').subscribe((data: Calendar) => {
      console.log('MainComponent');
      this.viewMonth = data.data;
    });
  }
}
