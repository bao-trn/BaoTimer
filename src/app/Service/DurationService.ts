import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Subscription} from "rxjs";
import {DataService} from "./DataService";
import {MeetingParameters} from "../Interface/meeting-parameters";

@Injectable({
  providedIn: 'root',
})

export class DurationService {

  time:number = 0;
  talkingTime:number = 0;
  isRunning:boolean = false;
  data:MeetingParameters = {meetingDuration: 8, talkingDuration: 4, nbSpeakers: 2, overtime:''};

  private timerSub:Subscription | null = null;

  private timeSubject = new BehaviorSubject<number>(0);
  public time$ = this.timeSubject.asObservable();

  private talkingTimeSubject = new BehaviorSubject<number>(0);
  public talkingTime$ = this.talkingTimeSubject.asObservable();


  constructor(private dataService:DataService<number>) {
    this.dataService.meetingData.subscribe(data => {
      this.data = data;
    })
  }

  startTimer() {
    if (!this.timerSub) {
      this.timerSub = interval(1000).subscribe(() => {
        this.time++;
        this.talkingTime++
        this.timeSubject.next(this.time);
        this.talkingTimeSubject.next(this.talkingTime);
        this.handleMeetingDuration(this.data.meetingDuration);
        this.handleTalkingDuration(this.data.talkingDuration);
        console.log(this.time)
      })
      this.isRunning = true;
    }
  }

  pauseTimer() {
    if (this.timerSub) {
      this.timerSub.unsubscribe(); // Stop the timer by unsubscribing
      this.timerSub = null;
    }
    this.isRunning = false;
  }

  handleMeetingDuration(meetingDuration:number) {
    if (this.time >= meetingDuration) {
      this.pauseTimer();
      //TODO make a popup saying the meeting is over
    }
  }

  handleTalkingDuration(talkingDuration:number) {
    if (this.talkingTime >= talkingDuration) {
      switch (this.data.overtime) {
        case 'always': {
          this.data.meetingDuration++;
          console.log("ALWAYS");
          break;
        }
        case 'optional': {
          console.log("OPTIONAL to be implemented");
          break;
        }
        case 'never': {
          console.log("NEVER")
          this.talkingTime = 0
          this.dataService.updateSpeakerData(true);
          break;
        }
      } // end of switch
    } //end of if
  }


  getTime() {
    return this.time;
  }

  getIsRunning() {
    return this.isRunning;
  }

}
