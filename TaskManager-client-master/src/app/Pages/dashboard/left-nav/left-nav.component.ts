import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../../Services/data.service';

@Component({
  selector: 'app-left-nav',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.scss'
})
export class LeftNavComponent implements OnInit {

  userDetails:any;
  userRole:any;
  user: string | any;
  constructor(private dataService: DataService){}
  ngOnInit(): void {
     
    this.user = localStorage.getItem("user");
    this.userDetails = JSON.parse(this.user);
    this.userRole=JSON.parse(this.user).role.roles;   
    
}
 viewComponent(comp:any){
  this.dataService.notifyOther(comp);
 
    
 }

}
