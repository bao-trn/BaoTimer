import {Component, OnInit} from '@angular/core';
import {TimerService} from "../Service/TimerService";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit{

  currentSpeaker:number = 1;
  time:number = 0;
  talkingTime:number = 0;
  remainingTalkingTime:number = 0;
  meetingDuration:number = 0;
  talkingDuration:number = 0;
  isRunning:boolean = false;
  popup:boolean = false;

  constructor(protected timerService:TimerService) {
  }

  ngOnInit() {
    this.timerService.currentSpeaker$.subscribe(speaker => {
      this.currentSpeaker = speaker;
    })
    this.timerService.time$.subscribe(time => {
      this.time = time;
    })
    this.timerService.talkingTime$.subscribe(talkingTime => {
      this.talkingTime = talkingTime;
    })
    this.timerService.remainingTalkingTime$.subscribe(remaining => {
      this.remainingTalkingTime = remaining;
    })
    this.timerService.isRunning$.subscribe(bool => {
      this.isRunning = bool;
    })
    this.timerService.popUp$.subscribe(bool => {
      this.popup = bool;
    })
    this.timerService.meetingParams$.subscribe(params => {
      this.meetingDuration = params.meetingDuration;
      this.talkingDuration = params.talkingDuration;
      document.documentElement.style.setProperty('--animation-duration', this.talkingDuration.toString() + ('s'));
    })
  }

  startTimer() {
    this.timerService.startTimer();
  }

  pauseTimer() {
    this.timerService.pauseTimer()
    console.log(this.isRunning)
  }

  resetTimer() {
    this.timerService.resetTimer();
  }

  nextSpeaker() {
    this.timerService.nextSpeaker();
  }

  getNbSpeakers() {
    return this.timerService.meetingParams.nbSpeakers;
  }

}
