import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MeetingComponent} from './meeting/meeting.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {FormsModule} from "@angular/forms";
import {TimeFormatPipe} from './time-format.pipe';
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    MeetingComponent,
    HomeComponent,
    TimeFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
