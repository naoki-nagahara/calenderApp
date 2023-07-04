import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarType } from '../calendar.type';
import { updateScheduleAction } from '../redux/action/addSchedule.action';
import { ITEMCOLORS } from '../color';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss'],
})
export class AddScheduleComponent {
  @Input() sendSchedule!: CalendarType;
  viewSchedule!: CalendarType;
  formText: string = '';
  list: any;
  selectedColor: string = '';
  isShow = false;
  boxColor = ITEMCOLORS;
  selected: boolean = false;
  selectedItem?: number;

  constructor(
    private store: Store<{
      calendarStore: { data: CalendarType[] };
      calenderClickStore: { data: CalendarType };
      toDayStore: { data: CalendarType };
    }>
  ) {}
  clickColor(color: string, index: number) {
    this.selectedColor = color;
    this.selectedItem = index;
  }
  addSchedule() {
    const current = this.sendSchedule;
    const month = this.sendSchedule.selectedMonth;
    if (this.formText.length) {
      this.store.select('calendarStore').subscribe((data) => {
        this.list = structuredClone(data.data);
      });
      let dayIndex: number = this.list[month - 1].findIndex(
        (obj: CalendarType) => {
          return (
            obj.date === current.date &&
            obj.selectedMonth === current.selectedMonth
          );
        }
      );
      let newObj = {
        text: this.formText,
        color: this.selectedColor,
      };
      this.store.dispatch(
        updateScheduleAction({
          data: newObj,
          selectedMonth: month,
          ObjIndex: dayIndex,
        })
      );
      this.formText = '';
    }
  }
  cancel() {
    this.isShow = false;
  }

  ngOnInit() {
    this.store.select('toDayStore').subscribe((data) => {
      console.log(data);
      this.sendSchedule = data.data;
    });
    this.store.select('calenderClickStore').subscribe((data: any) => {
      data.click === true ? (this.isShow = true) : false;
    });
  }
}
