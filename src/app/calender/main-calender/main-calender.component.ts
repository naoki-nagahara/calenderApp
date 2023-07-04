import { Component } from '@angular/core';
import { CalendarType } from 'src/app/calendar.type';
import { CalendarService } from 'src/app/service/calendar.service';
import { Store } from '@ngrx/store';
import { Calendar } from 'src/app/redux/reducer/calendar.reducer';
import { calendarClickAction } from 'src/app/redux/action/click.action';

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
      toDayStore: any;
    }>
  ) {}
  month: number[] = [];
  weeks: string[] = [];
  year!: number;
  viewMonth: any = [];
  sendSchedule!: CalendarType;
  clickedItem = false;
  selectedItem!: CalendarType;
  initialMonth: number = 0;

  getData(el: CalendarType) {
    if (el.empty === true) return;
    this.selectedItem = el;
    this.sendSchedule = el;
    console.log(el);
    this.store.dispatch(calendarClickAction({ clickData: el, hasClick: true }));
  }

  ngOnInit() {
    this.year = this.calendarService.year;
    this.month = this.calendarService.month;
    this.weeks = this.calendarService.weeks;
    this.store.select('calendarStore').subscribe((data: Calendar) => {
      console.log('MainComponent');
      this.viewMonth = data.data;
    });
    this.store.select('toDayStore').subscribe((data: Calendar) => {
      this.initialMonth = data.data.selectedMonth;
    });
  }
  ngAfterViewInit() {
    let mainContainer: HTMLElement = document.querySelector('.mainCalender')!;
    let monthItems = document.querySelectorAll('.mainCalender-container');
    let item1: any = monthItems[this.initialMonth - 1]!;
    let itemTop = item1.offsetTop;
    mainContainer.scrollTop = itemTop - 115;
  }
}
