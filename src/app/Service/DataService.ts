import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {MeetingParameters} from "../Interface/meeting-parameters";

@Injectable({
  providedIn: 'root',
})
export class DataService<T> {

  private initialMeetingData:MeetingParameters = {
    meetingDurationMinutes: 8,
    meetingDurationSeconds: 0,
    talkingDurationMinutes: 4,
    talkingDurationSeconds: 0,
    nbSpeakers: 2
  }

  private dataSource: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(null);
  meetingData: BehaviorSubject<MeetingParameters> = new BehaviorSubject<MeetingParameters>(this.initialMeetingData);

  currentData: Observable<T | null> = this.dataSource.asObservable()
  currentMeetingData: Observable<MeetingParameters> = this.meetingData.asObservable();


  updateData(data: T | null) {
    this.dataSource.next(data);
  }

  updateMeetingData(data:MeetingParameters) {
    this.meetingData.next(data);
  }


}
