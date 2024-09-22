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

  //TODO change all meeting to be computed with seconds within a service and handle negatives

  changeMeetingDuration(seconds:number) {
    this.meetingDuration += seconds;
    this.adjustMeetingDurations()
  }

  changeTalkingDuration(seconds:number) {
    this.talkingDuration += seconds;
    this.adjustTalkingDurations();
  }

  //round durations to closest 30s bound and adjust the timers depending on the number of speakers
  adjustMeetingDurations() {
    if ((this.meetingDuration % 30) != 0 && (this.meetingDuration - 30) < 0) {
      this.meetingDuration = 0;
    } else if ((this.meetingDuration % 30) != 0) {
      this.meetingDuration = 30;
    }

    this.talkingDuration = Math.floor(this.meetingDuration / this.nbSpeakers);
  }

  adjustTalkingDurations() {
    if ((this.talkingDuration % 30) != 0 && (this.talkingDuration - 30) < 0) {
      this.talkingDuration = 0;
    } else if ((this.talkingDuration % 30) != 0) {
      this.talkingDuration = 30;
    }

    this.meetingDuration = Math.floor(this.talkingDuration * this.nbSpeakers);
  }

  onNumberSpeakerChange(numberSpeakerEvent:number) {
    this.nbSpeakers = numberSpeakerEvent;
    this.adjustMeetingDurations();
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
