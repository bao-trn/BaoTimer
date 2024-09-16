import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class DurationService{
  private actionSource = new Subject<void>();

  action$ = this.actionSource.asObservable();

  callMethodInOtherComponent() {
    this.actionSource.next();
  }
}
