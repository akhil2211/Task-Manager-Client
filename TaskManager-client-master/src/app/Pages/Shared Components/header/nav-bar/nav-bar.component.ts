import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { AppService } from '../../../../Services/app-service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit
{
  user: string | any;
  username: string | any;
  firstname: string='';
  lastname: string='';
  shortname:string|any;
  constructor(private appService: AppService, private router: Router){}
  
  ngOnInit(): void {
    this.router.events.subscribe((value:any)=>
    {
      if(value.url){
        
        if(typeof localStorage!=="undefined" && localStorage.getItem("user")){
      this.user = localStorage.getItem("user");
      
     
      this.username = JSON.parse(this.user).username;
      

      this.firstname = JSON.parse(this.user).firstname;
      this.lastname = JSON.parse(this.user).lastname;
        if(this.lastname==null){
        this.shortname=this.firstname.charAt(0);
         }
        else{
            this.shortname=this.firstname.charAt(0)+ this.lastname?.charAt(0);
         }
      
    }
    else{
      this.username=null;
    }

      }
    })
    
  }
  
   logout(){
    const headers = new HttpHeaders().set('ResponseType', 'text');
    this.appService.postReturn(`${environment.apiUrl}/api/v1/auth/logout`,null,{headers}).subscribe((data:any)=>{
      console.log(data);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.router.navigate(["login"])
    },(error)=>{
      console.log(error);      
    })
  }
}

