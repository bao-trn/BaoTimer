import { Component } from '@angular/core';
import {DataService} from "../Service/DataService";
import {MeetingParameters} from "../Interface/meeting-parameters";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  public meetingDurationMinutes: number;
  public meetingDurationSeconds: number;

  public talkingDurationMinutes: number;
  public talkingDurationSeconds: number;
  public nbSpeakers: number;



  constructor(private dataService:DataService<any>) {
    this.meetingDurationMinutes = 5;
    this.meetingDurationSeconds = 15;
    this.talkingDurationMinutes = 5;
    this.talkingDurationSeconds = 15;
    this.nbSpeakers = 1;
  }

  changeMeetingDuration(minutes:number, seconds:number) {
    this.meetingDurationMinutes += minutes;
    this.meetingDurationSeconds += seconds;
    this.adjustMeetingDurations()

    //when seconds go above 60 increment minutes
    if (this.meetingDurationSeconds >= 60) {
      this.meetingDurationMinutes += Math.floor(this.meetingDurationSeconds / 60);
      this.meetingDurationSeconds = this.meetingDurationSeconds % 60
    }
    //when seconds go below 0 decrement minutes
    if (this.meetingDurationSeconds < 0) {
      this.meetingDurationMinutes--;
      this.meetingDurationSeconds = 60 + this.meetingDurationSeconds;
    }
    // when minutes go below 0 resets minutes and seconds
    if (this.meetingDurationMinutes < 0) {
      this.meetingDurationMinutes = 0;
      this.meetingDurationSeconds = 0;
    }
  }

  changeTalkingDuration(minutes:number, seconds:number) {
    this.talkingDurationMinutes += minutes;
    this.talkingDurationSeconds += seconds;
    this.adjustTalkingDurations();

    //when seconds go above 60 increment minutes
    if (this.talkingDurationSeconds >= 60) {
      this.talkingDurationMinutes += Math.floor(this.talkingDurationSeconds / 60);
      this.talkingDurationSeconds = this.talkingDurationSeconds % 60
    }
    //when seconds go below 0 decrement minutes
    if (this.talkingDurationSeconds < 0) {
      this.talkingDurationMinutes--;
      this.talkingDurationSeconds = 60 + this.talkingDurationSeconds;
    }
    // when minutes go below 0 resets minutes and seconds
    if (this.talkingDurationMinutes < 0) {
      this.talkingDurationMinutes = 0;
      this.talkingDurationSeconds = 0;
    }
  }

  //round durations to closest 30s bound and adjust the timers depending on the number of speakers
  adjustMeetingDurations() {
    if ((this.meetingDurationSeconds % 30) != 0 && (this.meetingDurationSeconds - 30) < 0) {
      this.meetingDurationSeconds = 0;
    } else if ((this.meetingDurationSeconds % 30) != 0) {
      this.meetingDurationSeconds = 30;
    }

    const totalDurationSeconds = (this.meetingDurationMinutes * 60) + this.meetingDurationSeconds;
    const talkingDuration = Math.floor(totalDurationSeconds / this.nbSpeakers);

    this.talkingDurationMinutes = Math.floor(talkingDuration / 60);
    this.talkingDurationSeconds = talkingDuration % 60;
  }

  adjustTalkingDurations() {
    if ((this.talkingDurationSeconds % 30) != 0 && (this.talkingDurationSeconds - 30) < 0) {
      this.talkingDurationSeconds = 0;
    } else if ((this.talkingDurationSeconds % 30) != 0) {
      this.talkingDurationSeconds = 30;
    }

    const totalDurationSeconds = (this.talkingDurationMinutes * 60) + this.talkingDurationSeconds;
    const meetingDuration = Math.floor(totalDurationSeconds * this.nbSpeakers);

    this.meetingDurationMinutes = Math.floor(meetingDuration / 60);
    this.meetingDurationSeconds = meetingDuration % 60
  }

  onNumberSpeakerChange(numberSpeakerEvent:number) {
    this.nbSpeakers = numberSpeakerEvent;
    this.adjustMeetingDurations();
  }

  sendMeetingData() {
    const meetingDurationMinutes = this.meetingDurationMinutes;
    const meetingDurationSeconds = this.meetingDurationSeconds;
    const talkingDurationMinutes = this.talkingDurationMinutes;
    const talkingDurationSeconds = this.talkingDurationSeconds;
    const nbSpeakers = this.nbSpeakers;
    console.log("SENDING DATA")
    const meetingParams: MeetingParameters = {meetingDurationMinutes, meetingDurationSeconds, talkingDurationMinutes, talkingDurationSeconds, nbSpeakers};
    this.dataService.updateMeetingData(meetingParams)
  }


}
