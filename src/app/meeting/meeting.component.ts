import {Component} from '@angular/core';
import {DataService} from "../Service/DataService";
import {interval, Subscription} from "rxjs";
import {MeetingParameters} from "../Interface/meeting-parameters";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent {

  protected data:MeetingParameters = {
    meetingDurationMinutes:0,
    meetingDurationSeconds:0,
    talkingDurationMinutes:0,
    talkingDurationSeconds:0,
    nbSpeakers:0
  };
  private totalMeetingDuration:number;

  protected currentMeetingDurationMinutes = 0;
  protected currentMeetingDurationSeconds = 0;
  private totalCurrentMeetingDuration = (this.currentMeetingDurationMinutes * 60) + this.currentMeetingDurationSeconds;

  protected currentTalkingDurationMinutes = 0;
  protected currentTalkingDurationSeconds = 0;
  private totalCurrentTalkingDuration = (this.currentTalkingDurationMinutes * 60) + this.currentTalkingDurationSeconds;

  public currentSpeaker:number;

  private timerSub:Subscription | null = null;

  constructor(private dataService:DataService<any>) {
    this.currentSpeaker = 1;
    this.dataService.meetingData.subscribe(data => {
      console.log(data);
      this.data = data;
    })
    this.totalMeetingDuration = (this.data.meetingDurationMinutes * 60) + this.data.meetingDurationSeconds;
  }

  ngOnInit() {
  }

  startTimer() {
    console.log(this.totalMeetingDuration)
    if (!this.timerSub) {
      this.timerSub = interval(1000).subscribe(() => {
        if (this.totalCurrentMeetingDuration < this.totalMeetingDuration) {
          console.log("TIMER START")
          this.totalCurrentMeetingDuration++;
          this.computeRemainingDurations(this.totalCurrentMeetingDuration);
        } else {
          this.pauseTimer();
        }
      })
    }
  }

  pauseTimer() {
    if (this.timerSub) {
      this.timerSub.unsubscribe(); // Stop the timer by unsubscribing
      this.timerSub = null;
    }
  }

  private computeRemainingDurations(globalTimer:number) {
    this.changeMeetingDuration(0, 1);
  }

  changeMeetingDuration(minutes:number, seconds:number) {
    this.currentMeetingDurationMinutes += minutes;
    this.currentMeetingDurationSeconds+= seconds;

    //when seconds go above 60 increment minutes
    if (this.currentMeetingDurationSeconds >= 60) {
      this.currentMeetingDurationMinutes += Math.floor(this.currentMeetingDurationSeconds / 60);
      this.currentMeetingDurationSeconds = this.currentMeetingDurationSeconds % 60
    }
    //when seconds go below 0 decrement minutes
    if (this.currentMeetingDurationSeconds < 0) {
      this.currentMeetingDurationMinutes--;
      this.currentMeetingDurationSeconds = 60 + this.currentMeetingDurationSeconds;
    }
    // when minutes go below 0 resets minutes and seconds
    if (this.currentMeetingDurationMinutes < 0) {
      this.currentMeetingDurationMinutes = 0;
      this.currentMeetingDurationSeconds = 0;
    }
  }

 /* changeTalkingDuration(minutes:number, seconds:number) {
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
  }*/

  onClickNextSpeaker() {
    if (this.currentSpeaker < this.data.nbSpeakers) {
      this.currentSpeaker ++;
    }
  }



  triggerOvertime() {
    console.log("talking duration exceeded");
  }

}
