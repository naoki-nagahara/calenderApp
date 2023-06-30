import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { CdkDrag } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { CalenderComponent } from './calender/calender.component';
import { MainCalenderComponent } from './calender/main-calender/main-calender.component';
import { SubCalenderComponent } from './calender/sub-calender/sub-calender.component';
import { ScheduleComponent } from './calender/sub-calender/schedule/schedule.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { CalenderItemComponent } from './calender/calender-item/calender-item.component';
import { StoreModule } from '@ngrx/store';
import { calendarReducer } from './redux/reducer/calendar.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { clickCalendarReducer } from './redux/reducer/ccalendarClick.reducer';
import { todayReducer } from './redux/reducer/today.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CalenderComponent,
    MainCalenderComponent,
    SubCalenderComponent,
    ScheduleComponent,
    AddScheduleComponent,
    CalenderItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    CdkDrag,
    StoreModule.forRoot({
      calendarStore: calendarReducer,
      calenderClickStore: clickCalendarReducer,
      toDayStore: todayReducer,
    }),
    StoreDevtoolsModule.instrument({}),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
