import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number): string {
      const hours = Math.floor(value / 3600);
      const minutes = Math.floor((value % 3600) / 60);
      const seconds = value % 60;

      const hoursStr = hours < 10 ? '0' + hours : hours;
      const minutesStr = minutes < 10 ? '0' + minutes : minutes;
      const secondsStr = seconds < 10 ? '0' + seconds : seconds;

      return `${hoursStr}:${minutesStr}:${secondsStr}`;
  }


}
