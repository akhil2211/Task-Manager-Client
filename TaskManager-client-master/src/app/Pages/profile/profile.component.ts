import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../Services/app-service.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'] 
})

export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(private userService: AppService) {}

  ngOnInit() {
   
    const apiUrl=`${environment.apiUrl}/api/v1/user/currentUserProfile`;
    const userData = '';

    this.userService.getReturn(apiUrl, userData).subscribe((userData: any) => {
      this.user = userData;
    });
  }
}
