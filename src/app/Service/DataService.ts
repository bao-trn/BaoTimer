import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService<T> {

  private dataSource: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(null);
  private dataSubject: BehaviorSubject<{val1:number, val2:number, val3:number}> = new BehaviorSubject<{val1:number, val2:number, val3:number}>({val1:0,val2:0,val3:0});

  currentData: Observable<T | null> = this.dataSource.asObservable();
  meetingData: Observable<{val1:number, val2:number, val3:number}> = this.dataSubject.asObservable();


  updateData(data: T | null) {
    this.dataSource.next(data);
  }

  updateMeetingData(val1:number, val2:number, val3:number) {
    this.dataSubject.next({val1, val2, val3});
  }

  getData(): Observable<T | null> {
    return this.currentData;
  }

}
