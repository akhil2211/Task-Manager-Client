import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTeamComponent } from '../../list-team/list-team.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule,ListTeamComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent implements OnInit {
  ngOnInit(): void {
  }

}
