import { Component } from '@angular/core';
import {DataService} from "../Service/DataService";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  public meetingDurationMinutes: number;
  public nbSpeaker: number;
  public talkingDurationMinutes: number;


  constructor(private dataService:DataService<any>) {
    this.meetingDurationMinutes = 5;
    this.nbSpeaker = 1;
    this.talkingDurationMinutes = 5;
  }

  onMeetingDurationChange(meetingDurationEvent:number) {
    this.meetingDurationMinutes = meetingDurationEvent;
    this.talkingDurationMinutes = this.meetingDurationMinutes / this.nbSpeaker;
  }

  onNumberSpeakerChange(numberSpeakerEvent:number) {
    this.nbSpeaker = numberSpeakerEvent;
  }

  onTalkingDurationChange(talkingDurationEvent:number) {
    this.talkingDurationMinutes = talkingDurationEvent;
    this.meetingDurationMinutes = this.nbSpeaker * this.talkingDurationMinutes;

  }

  sendData() {
    const val1= this.meetingDurationMinutes;
    const val2= this.nbSpeaker;
    const val3= this.talkingDurationMinutes;
    this.dataService.updateMeetingData(val1, val2, val3);
    console.log(val1, val2, val3);
  }


}
