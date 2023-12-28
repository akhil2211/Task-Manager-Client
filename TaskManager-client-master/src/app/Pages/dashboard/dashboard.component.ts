import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { ProjectComponent } from '../project/project.component';
import { ViewAreaComponent } from './view-area/view-area.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,LeftNavComponent,ViewAreaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
