import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Subscription} from "rxjs";
import {DataService} from "./DataService";
import {MeetingParameters} from "../Interface/meeting-parameters";

@Injectable({
  providedIn: 'root',
})

export class DurationService {

  currentSpeaker:number = 1;
  time:number = 0;
  talkingTime:number = 0;
  remainingTalkingTime:number = 0;
  initialTalkingDuration:number = 0;
  isRunning:boolean = false;
  data:MeetingParameters = {meetingDuration: 60, talkingDuration: 15, nbSpeakers: 4, overtime:'always'};

  private timerSub:Subscription | null = null;

  private timeSubject = new BehaviorSubject<number>(0);
  public time$ = this.timeSubject.asObservable();

  private talkingTimeSubject = new BehaviorSubject<number>(0);
  public talkingTime$ = this.talkingTimeSubject.asObservable();


  constructor(private dataService:DataService<number>) {
    this.dataService.meetingData.subscribe(data => {
      this.data = data;
      this.remainingTalkingTime = data.talkingDuration;
      this.initialTalkingDuration = data.talkingDuration;
    })
  }

  startTimer() {
    if (!this.timerSub) {
      this.timerSub = interval(1000).subscribe(() => {
        this.incrementTime();
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

  incrementTime() {
    this.time++;
    this.talkingTime++
    this.timeSubject.next(this.time);
    this.talkingTimeSubject.next(this.talkingTime);
    this.remainingTalkingTime--;
  }

  nextSpeaker() {
    if (this.currentSpeaker < this.data.nbSpeakers) {
      this.currentSpeaker++;
      this.talkingTime = 0;
      this.talkingTimeSubject.next(this.talkingTime);
      if (this.data.overtime === 'overflow') {
        this.data.talkingDuration = this.initialTalkingDuration + this.remainingTalkingTime;
      }
      this.remainingTalkingTime = this.data.talkingDuration;
    }
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
        case 'overflow':
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
          this.currentSpeaker++;
          break;
        }
      } // end of switch
    }//end of if
  }


  getTime() {
    return this.time;
  }

  getIsRunning() {
    return this.isRunning;
  }

}
