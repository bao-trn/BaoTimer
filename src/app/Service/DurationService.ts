import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class DurationService {

  public meetingDuration:number = 600;
  public talkingDuration:number = 60;
  public nbSpeakers:number = 10;

  public meetingDurationSubject = new BehaviorSubject<number>(this.meetingDuration);
  public talkingDurationSubject = new BehaviorSubject<number>(this.talkingDuration);
  public nbSpeakersSubject = new BehaviorSubject<number>(this.nbSpeakers);

  public meetingDuration$ = this.meetingDurationSubject.asObservable();
  public talkingDuration$ = this.talkingDurationSubject.asObservable();
  public nbSpeakers$ = this.nbSpeakersSubject.asObservable();


  constructor() {
  }

  public changeMeetingDuration(seconds:number) {
    this.meetingDuration += seconds;
    this.adjustMeetingDurations(seconds);
    this.updateValues();

  }

  public changeTalkingDuration(seconds:number) {
    this.talkingDuration += seconds;
    this.adjustTalkingDurations(seconds);
    this.updateValues();
  }

  public onNumberSpeakerChange(numberSpeakerEvent:number) {
    this.nbSpeakers = numberSpeakerEvent;
    this.talkingDuration = Math.floor(this.meetingDuration / this.nbSpeakers);
    this.updateValues()
  }

  private updateValues() {
    this.meetingDurationSubject.next(this.meetingDuration);
    this.talkingDurationSubject.next(this.talkingDuration);
    this.nbSpeakersSubject.next(this.nbSpeakers);
  }

  //round durations to closest 30s bound and adjust the timers depending on the number of speakers
  private adjustMeetingDurations(seconds:number) {
    if (seconds % 60 === 0) { //if negative then 0 else round to closest 60 bound
      if (this.meetingDuration < 0) {
        this.meetingDuration = 0;
      } else {
        this.meetingDuration -= this.meetingDuration % seconds;
      }
    } else if (seconds % 30 === 0) { //if negative then 0 else round to closest 30 bound
      if (this.meetingDuration <= 0) {
        this.meetingDuration = 0;
      } else {
        this.meetingDuration -= this.meetingDuration % seconds;
      }
    }

    this.talkingDuration = Math.floor(this.meetingDuration / this.nbSpeakers);
  }

  private adjustTalkingDurations(seconds:number) {
    if (this.talkingDuration <= 0) {
      this.talkingDuration = 0;
    } else {
      this.talkingDuration += this.talkingDuration % seconds;
    }
    this.meetingDuration = Math.floor(this.talkingDuration * this.nbSpeakers);
  }

}
