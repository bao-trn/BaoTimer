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
  public initialMeetingDuration:number= 0;
  public initialTalkingDuration:number = 0;
  public meetingParams:MeetingParameters = {meetingDuration: 60, talkingDuration: 15, nbSpeakers: 4};
  public isRunning:boolean = false;
  public popUp:boolean = false;

  private timerSub:Subscription | null = null;

  private currentSpeakerSubject = new BehaviorSubject<number>(this.currentSpeaker);
  private timeSubject = new BehaviorSubject<number>(0);
  private talkingTimeSubject = new BehaviorSubject<number>(0);
  private remainingTalkingTimeSubject = new BehaviorSubject<number>(this.remainingTalkingTime);
  private meetingParamsSubject = new BehaviorSubject<MeetingParameters>(this.meetingParams);
  private isRunningSubject = new BehaviorSubject<boolean>(this.isRunning);
  private popUpSubject = new BehaviorSubject<boolean>(this.popUp);

  public currentSpeaker$ = this.currentSpeakerSubject.asObservable();
  public time$ = this.timeSubject.asObservable();
  public talkingTime$ = this.talkingTimeSubject.asObservable();
  public remainingTalkingTime$ = this.remainingTalkingTimeSubject.asObservable();
  public meetingParams$ = this.meetingParamsSubject.asObservable();
  public isRunning$ = this.isRunningSubject.asObservable();
  public popUp$ = this.popUpSubject.asObservable();

  constructor(private dataService:DataService<number>) {
    this.dataService.meetingData.subscribe((meetingParams: MeetingParameters) => {
      this.meetingParams = meetingParams;
      this.meetingParamsSubject.next(meetingParams);
      this.remainingTalkingTime = meetingParams.talkingDuration;
      this.initialMeetingDuration = meetingParams.meetingDuration;
      this.initialTalkingDuration = meetingParams.talkingDuration;
    })

  }

  public startTimer() {
    if (!this.timerSub) {
      this.timerSub = interval(1000).subscribe(() => {
        this.incrementTime();
        this.handleMeetingDuration(this.meetingParams.meetingDuration);
        this.handleTalkingDuration(this.meetingParams.talkingDuration);
        this.updateSubjects();
      })
      this.isRunning = true;
      this.isRunningSubject.next(this.isRunning);
    }
  }

  public pauseTimer() {
    if (this.timerSub) {
      this.timerSub.unsubscribe(); // Stop the timer by unsubscribing
      this.timerSub = null;
    }
    this.isRunning = false;
    this.isRunningSubject.next(this.isRunning);
  }

  public resetTimer() {
    this.pauseTimer();
    this.currentSpeaker = 1;
    this.time = 0;
    this.talkingTime = 0;
    this.remainingTalkingTime = 0;
    this.meetingParams.meetingDuration = this.initialMeetingDuration;
    this.meetingParams.talkingDuration = this.initialTalkingDuration;
    this.updateSubjects();
  }

  public nextSpeaker() {
    this.currentSpeaker++;
    this.talkingTime = 0;
    let extraMeetingTime = this.meetingParams.meetingDuration - this.initialMeetingDuration;
    if (extraMeetingTime > 0 && this.remainingTalkingTime > 0) {
      this.meetingParams.meetingDuration = this.initialMeetingDuration; // reset meetingDuration
      this.meetingParams.talkingDuration = this.initialTalkingDuration + this.remainingTalkingTime - extraMeetingTime;

    } else {
      this.meetingParams.talkingDuration = this.initialTalkingDuration + this.remainingTalkingTime;
    }
    this.remainingTalkingTime = this.meetingParams.talkingDuration;
    this.updateSubjects();
  }

  private handleMeetingDuration(meetingDuration:number) {
    if (this.time >= meetingDuration) {
      this.pauseTimer();
    } if ((this.currentSpeaker >= this.meetingParams.nbSpeakers && this.time >= meetingDuration) ||
      (this.currentSpeaker >= this.meetingParams.nbSpeakers && this.talkingTime >= this.meetingParams.talkingDuration)) {
      this.popUp = true;
      this.pauseTimer();
    }
  }

  private handleTalkingDuration(talkingDuration:number) {
    if (this.talkingTime > talkingDuration) {
      this.meetingParams.meetingDuration++;
    }
  }

  private incrementTime() {
    if (this.time < this.meetingParams.meetingDuration) {
      this.time++;
      this.talkingTime++
      if (this.remainingTalkingTime > 0) {
        this.remainingTalkingTime--;
      }
      this.updateSubjects();
    }
  }

  private updateSubjects() {
    this.currentSpeakerSubject.next(this.currentSpeaker);
    this.timeSubject.next(this.time);
    this.talkingTimeSubject.next(this.talkingTime);
    this.remainingTalkingTimeSubject.next(this.remainingTalkingTime);
    this.meetingParamsSubject.next(this.meetingParams);
    this.popUpSubject.next(this.popUp);
  }

}
