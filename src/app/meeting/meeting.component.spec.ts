import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MeetingComponent} from './meeting.component';

describe('MeetingComponent', () => {
  let component: MeetingComponent;
  let fixture: ComponentFixture<MeetingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingComponent]
    });
    fixture = TestBed.createComponent(MeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
