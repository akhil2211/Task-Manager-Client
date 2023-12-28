import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../../Services/app-service.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {

  loginForm : FormGroup|any ;
  submit:boolean=false;
  loginSuccess: boolean | any;
  errorMsg:string | any;
  
  constructor(private formBuilder : FormBuilder, private appService: AppService,private router:Router){}

    ngOnInit():void{

    this.loginForm=this.formBuilder.group({
     username:["",[Validators.required,Validators.minLength(4),Validators.maxLength(10)]],
     password:["",[Validators.required,Validators.pattern("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}")]],

   })
 }

 userLogin(){
  console.log(this.loginForm);
  
  this.submit=true;
  if(this.loginForm.invalid){
    this.loginForm.markAllAsTouched();
    console.log(this.submit);
    return;
      }

  const formValues= this.loginForm.getRawValue(); 

  const userData= {
    username: formValues.username,
    password: formValues.password
  }
 
 const apiUrl=`${environment.apiUrl}/api/v1/auth/login`;
 const apiUrl1=`${environment.apiUrl}/api/v1/user/currentUserProfile`;

 this.appService.postReturn(apiUrl, userData).subscribe((res:any) =>{
    
  if(res.status=="True"){
    this.loginSuccess=true;
    this.loginForm.reset();
    console.log(res.response);   
    localStorage.setItem("token",res.response); 
  
    this.appService.getReturn(apiUrl1).subscribe((resp:any) =>{
      localStorage.setItem("user",JSON.stringify(resp))
      this.router.navigate(["/dashboard"])
    },(error)=>{
      this.loginSuccess = false;      
    })

  }

  else{
    this.errorMsg =res.response;
      this.loginSuccess = false;
      console.error(res.response);      
  }
 })
 
 this.submit=false;
}

}
