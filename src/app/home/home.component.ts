import {Component} from '@angular/core';
import {DataService} from "../Service/DataService";
import {MeetingParameters} from "../Interface/meeting-parameters";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public meetingDuration:number = 60; //TODO low values for testing purpose, to change
  public talkingDuration:number = 15;
  public nbSpeakers:number = 4;
  public overtime:string = 'always';



  constructor(private dataService:DataService<any>) {
  }

  //TODO change all meeting to be computed with seconds within a service

  changeMeetingDuration(seconds:number) {
    this.meetingDuration += seconds;
    this.adjustMeetingDurations(seconds);
  }

  changeTalkingDuration(seconds:number) {
    this.talkingDuration += seconds;
    this.adjustTalkingDurations(seconds);
  }

  //round durations to closest 30s bound and adjust the timers depending on the number of speakers
  adjustMeetingDurations(seconds:number) {
    if (seconds % 60 === 0) { //if negative then 0 else round to closest 60 bound
      if (this.meetingDuration < 0) {
        this.meetingDuration = 0;
      } else {
        this.meetingDuration -= this.meetingDuration % 60;
      }
    } else if (seconds % 30 === 0) { //if negative then 0 else round to closest 30 bound
      if (this.meetingDuration <= 0) {
        this.meetingDuration = 0;
      } else {
        this.meetingDuration -= this.meetingDuration % 30
      }
    }

    this.talkingDuration = Math.floor(this.meetingDuration / this.nbSpeakers);
  }

  adjustTalkingDurations(seconds:number) {
    if (seconds % 60 === 0) { //if negative then 0 else round to closest 60 bound
      if (this.talkingDuration < 0) {
        this.talkingDuration = 0;
      } else {
        this.talkingDuration -= this.talkingDuration % 60;
      }
    } else if (seconds % 30 === 0) { //if negative then 0 else round to closest 30 bound
      if (this.talkingDuration <= 0) {
        this.talkingDuration = 0;
      } else {
        this.talkingDuration -= this.talkingDuration % 30
      }
    }

    this.meetingDuration = Math.floor(this.talkingDuration * this.nbSpeakers);
  }

  onNumberSpeakerChange(numberSpeakerEvent:number) {
    this.nbSpeakers = numberSpeakerEvent;
  }

  sendMeetingData() {
    const meetingDuration = this.meetingDuration;
    const talkingDuration = this.talkingDuration;
    const nbSpeakers = this.nbSpeakers;
    const overtime = this.overtime;
    const meetingParams: MeetingParameters = {meetingDuration, talkingDuration, nbSpeakers, overtime};
    console.log("SENDING DATA" + meetingParams.overtime);

    this.dataService.updateMeetingData(meetingParams)
  }


}
