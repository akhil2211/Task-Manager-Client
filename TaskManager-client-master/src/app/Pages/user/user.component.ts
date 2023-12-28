import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../Services/app-service.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  users: any[] = [];
 
  constructor(private userService: AppService) { }
 
  ngOnInit(): void {
    this.loadUsers();
  }
 
  loadUsers() {
    
    this.userService.getReturn(`${environment.apiUrl}/api/v1/user/list`).subscribe(
      (data: any) => {
        this.users = data;
        console.log(this.users);
        
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }
}



