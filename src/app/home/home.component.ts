import {Component, OnInit} from '@angular/core';
import {DataService} from "../Service/DataService";
import {MeetingParameters} from "../Interface/meeting-parameters";
import {DurationService} from "../Service/DurationService";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public meetingDuration:number = 0;
  public talkingDuration:number = 0;
  public nbSpeakers:number = 0;

  constructor(private dataService:DataService<MeetingParameters>, private durationService:DurationService) {
  }

  ngOnInit(): void {
    this.durationService.meetingDuration$.subscribe(time => {
      this.meetingDuration = time;
    })
    this.durationService.talkingDuration$.subscribe(time => {
      this.talkingDuration = time;
    })
    this.durationService.nbSpeakers$.subscribe(nb => {
      this.nbSpeakers = nb;
    })
  }


  changeMeetingDuration(seconds:number) {
    this.durationService.changeMeetingDuration(seconds);
  }

  changeTalkingDuration(seconds:number) {
    this.durationService.changeTalkingDuration(seconds)
  }

  changeSpeaker(event:number) {
    this.durationService.onNumberSpeakerChange(event);
  }

  sendMeetingData() {
    const meetingDuration = this.meetingDuration;
    const talkingDuration = this.talkingDuration;
    const nbSpeakers = this.nbSpeakers;
    const meetingParams: MeetingParameters = {meetingDuration, talkingDuration, nbSpeakers};
    console.log("SENDING DATA");
    this.dataService.updateMeetingData(meetingParams)
  }


}
