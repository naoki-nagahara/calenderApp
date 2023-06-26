import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { CalenderComponent } from './calender/calender.component';
import { MainCalenderComponent } from './calender/main-calender/main-calender.component';
import { SubCalenderComponent } from './calender/sub-calender/sub-calender.component';
import { ScheduleComponent } from './calender/sub-calender/schedule/schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CalenderComponent,
    MainCalenderComponent,
    SubCalenderComponent,
    ScheduleComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
