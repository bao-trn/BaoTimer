import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Subscription} from "rxjs";
import {MeetingParameters} from "../Interface/meeting-parameters";
import {DataService} from "./DataService";

@Injectable({
  providedIn: 'root',
})

export class TimerService {

  public currentSpeaker:number = 1;
  public time:number = 0;
  public talkingTime:number = 0;
  public remainingTalkingTime:number = 0;
  public initialTalkingDuration:number = 0;
  public meetingParams:MeetingParameters = {meetingDuration: 60, talkingDuration: 15, nbSpeakers: 4, overtime:'always'};
  public isRunning:boolean = false;

  private timerSub:Subscription | null = null;

  private currentSpeakerSubject = new BehaviorSubject<number>(0);
  private timeSubject = new BehaviorSubject<number>(0);
  private talkingTimeSubject = new BehaviorSubject<number>(0);
  private remainingTalkingTimeSubject = new BehaviorSubject<number>(this.remainingTalkingTime);
  private meetingParamsSubject = new BehaviorSubject<MeetingParameters>(this.meetingParams);

  public currentSpeaker$ = this.currentSpeakerSubject.asObservable();
  public time$ = this.timeSubject.asObservable();
  public talkingTime$ = this.talkingTimeSubject.asObservable();
  public remainingTalkingTime$ = this.remainingTalkingTimeSubject.asObservable();
  public meetingParams$ = this.meetingParamsSubject.asObservable();

  constructor(private dataService:DataService<number>) {
    this.dataService.meetingData.subscribe((meetingParams: MeetingParameters) => {
      this.meetingParams = meetingParams;
      this.meetingParamsSubject.next(meetingParams);
      this.remainingTalkingTime = meetingParams.talkingDuration;
      this.initialTalkingDuration = meetingParams.talkingDuration;
    })
  }

  public startTimer() {
    if (!this.timerSub) {
      this.timerSub = interval(1000).subscribe(() => {
        this.incrementTime();
        this.handleMeetingDuration(this.meetingParams.meetingDuration);
        this.handleTalkingDuration(this.meetingParams.talkingDuration);
        this.updateTimes();
        console.log(this.time)
      })
      this.isRunning = true;
    }
  }

  public pauseTimer() {
    if (this.timerSub) {
      this.timerSub.unsubscribe(); // Stop the timer by unsubscribing
      this.timerSub = null;
    }
    this.isRunning = false;
  }

  public nextSpeaker() {
    if (this.currentSpeaker < this.meetingParams.nbSpeakers) {
      this.currentSpeaker++;
      this.talkingTime = 0;
      if (this.meetingParams.overtime === 'overflow') {
        this.meetingParams.talkingDuration = this.initialTalkingDuration + this.remainingTalkingTime;
      }
      this.remainingTalkingTime = this.meetingParams.talkingDuration;
    }
    this.updateTimes();
  }

  private handleMeetingDuration(meetingDuration:number) {
    if (this.time >= meetingDuration) {
      this.pauseTimer();
      //TODO make a popup saying the meeting is over
    }
  }

  private handleTalkingDuration(talkingDuration:number) {
    if (this.talkingTime >= talkingDuration) {
      switch (this.meetingParams.overtime) {
        case 'overflow':
        case 'always': {
          this.meetingParams.meetingDuration++;
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

  private incrementTime() {
    if (this.time < this.meetingParams.meetingDuration) {
      this.time++;
      this.talkingTime++
      this.remainingTalkingTime--;
      this.updateTimes();
    }
  }

  private updateTimes() {
    this.currentSpeakerSubject.next(this.currentSpeaker);
    this.timeSubject.next(this.time);
    this.talkingTimeSubject.next(this.talkingTime);
    this.remainingTalkingTimeSubject.next(this.remainingTalkingTime);
    this.meetingParamsSubject.next(this.meetingParams);
  }

}
