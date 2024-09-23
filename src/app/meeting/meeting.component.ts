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
    this.timerService.meetingParams$.subscribe(params => {
      this.meetingDuration = params.meetingDuration;
      this.talkingDuration = params.talkingDuration;
    })
  }

  startTimer() {
    this.timerService.startTimer();
    console.log(this.isRunning)
  }

  pauseTimer() {
    this.timerService.pauseTimer()
  }

  nextSpeaker() {
    this.timerService.nextSpeaker();
  }


}
