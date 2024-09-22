import {Component} from '@angular/core';
import {DataService} from "../Service/DataService";
import {DurationService} from "../Service/DurationService";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent {

  public currentSpeaker:number = 0;

  constructor(private dataService:DataService<any>, protected durationService:DurationService) {
    this.dataService.speakerData.subscribe(data => {
      this.switchSpeaker(data);
    })
  }

  switchSpeaker(direction:boolean) {
    if (this.currentSpeaker < this.durationService.data.nbSpeakers) {
      if (direction) {
        this.currentSpeaker++;
      } else {
        this.currentSpeaker--
      }
    } //TODO handle last speaker
  }

}
