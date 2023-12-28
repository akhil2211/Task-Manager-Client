import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { AppService } from '../../Services/app-service.service';

@Component({
  selector: 'app-list-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-team.component.html',
  styleUrl: './list-team.component.scss'
})
export class ListTeamComponent implements OnInit{
  members: any[] = [];
 
  constructor(private userService: AppService) { }
 
  ngOnInit(): void {
    this.loadMembers();
  }
 
  loadMembers() {
    
    this.userService.getReturn(`${environment.apiUrl}/api/v1/user/team`).subscribe(
      (data: any) => {
        this.members = data;
        console.log(this.members);
        
      },
      (error) => {
        console.error('Error fetching team:', error);
      }
    );
  }
}



