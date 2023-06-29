import { Component } from '@angular/core';
import { CalendarService } from './service/calendar.service';
import { Store } from '@ngrx/store';
import { CalendarType } from './calendar.type';
import { calendarAction } from './redux/action/calendar.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private s: CalendarService,
    private store: Store<{ calendarStore: CalendarType }>
  ) {}
  ngOnInit() {
    this.s.joinDays().subscribe((data) => {
      this.store.dispatch(calendarAction({ data: data }));
      console.log('OK');
    });
  }
}
