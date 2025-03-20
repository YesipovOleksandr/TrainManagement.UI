import { Injectable, NgZone } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  getCurrentDateTime(): Date {
    const currentUtcTime = moment.utc();
    const currentDateTimeMinus5 = moment.tz(currentUtcTime, 'America/New_York');

    const dateObject = new Date(
      currentDateTimeMinus5.year(),
      currentDateTimeMinus5.month(),
      currentDateTimeMinus5.date(),
      currentDateTimeMinus5.hours(),
      currentDateTimeMinus5.minutes(),
      currentDateTimeMinus5.seconds()
    );
    return dateObject;
  }
}