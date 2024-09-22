import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {MeetingParameters} from "../Interface/meeting-parameters";
import {MeetingTicks} from "../Interface/meeting-ticks";

@Injectable({
  providedIn: 'root',
})
export class DataService<T> {

  private initialMeetingData:MeetingParameters = {
    meetingDuration: 8,
    talkingDuration: 4,
    nbSpeakers: 2,
    overtime:''
  }



  dataSource: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(null);
  speakerData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  meetingData: BehaviorSubject<MeetingParameters> = new BehaviorSubject<MeetingParameters>(this.initialMeetingData);

  currentData: Observable<T | null> = this.dataSource.asObservable()
  currentMeetingData: Observable<MeetingParameters> = this.meetingData.asObservable();


  updateSpeakerData(data:boolean) {
    this.speakerData.next(data);
  }

  updateData(data: T | null) {
    this.dataSource.next(data);
  }

  updateMeetingData(data:MeetingParameters) {
    this.meetingData.next(data);
  }




}
