import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingComponent} from "./meeting/meeting.component";
import { AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: 'meeting-room', component: MeetingComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: "full" }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
