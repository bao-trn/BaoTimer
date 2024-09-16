import {Component, Input} from '@angular/core';
import {DataService} from "../Service/DataService";
import {interval, map, Observable, take} from "rxjs";
import {TimeComponents} from "../Interface/time-components";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent {

  public currentSpeaker:number;
  public nbSpeaker:number = 1;

  public meetingDurationMinutes:number = 5;
  public meetingDurationSeconds:number = 0;

  public talkingDurationMinutes:number = 5;
  public talkingDurationSeconds:number = 0;

  public currentMeetingDurationMinutes = 0;
  public currentMeetingDurationSeconds = 0;

  public currentTalkingDurationMinutes = 0;
  public currentTalkingDurationSeconds = 0;

  constructor(private dataService:DataService<any>) {
    this.currentSpeaker = 1;
  }

  ngOnInit() {
    this.dataService.meetingData.subscribe(data => {
      this.meetingDurationMinutes = data.val1;
      this.nbSpeaker = data.val2;
      this.talkingDurationMinutes = data.val3;
    })
  }

  onClickNextSpeaker() {
    if (this.currentSpeaker < this.nbSpeaker) {
      this.currentSpeaker ++;
    }
  }

  onClickStartTimer() {
    const time = interval(1000);
    const takeT = time.pipe(take(this.meetingDurationMinutes));
    takeT.subscribe(x => {
      this.currentMeetingDurationSeconds = 1 + x;
      console.log(this.currentMeetingDurationSeconds)
    });

  }


}
