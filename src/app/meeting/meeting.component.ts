import {Component} from '@angular/core';
import {DataService} from "../Service/DataService";
import {MeetingParameters} from "../Interface/meeting-parameters";
import {DurationService} from "../Service/DurationService";
import {async} from "rxjs";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent {

  public currentSpeaker:number = 0;

  time:number = 0;
  hours: number = 0;
  minutes:number = 0;
  seconds:number = 0;

  totalDuration = 0;
  totalCurrentDuration = 0;

  constructor(private dataService:DataService<any>, protected durationService:DurationService) {
    this.dataService.speakerData.subscribe(data => {
      this.switchSpeaker(data);
    })
  }

  switchSpeaker(direction:boolean) {
    if (direction) {
      this.currentSpeaker++;
    } else {
      this.currentSpeaker--
    }
  }

}
