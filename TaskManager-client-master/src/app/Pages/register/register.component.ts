import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { response } from 'express';
import { AppService } from '../../Services/app-service.service';
import { Router } from '@angular/router';
import { User } from '../../Models/data';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

   registerForm !: FormGroup ;
   loginForm: any;
   submit:boolean=false;
   registerSuccess: boolean | any;
   errorMsg:string | any;   
   users:any[] = []
   reportingofficers: any;


   constructor(private formBuilder : FormBuilder, private appService : AppService, private router: Router){}
    ngOnInit(){
     this.registerForm=this.formBuilder.group({
      firstname:["",Validators.required],
      lastname:[""],
      username:["",[Validators.required,Validators.minLength(4),Validators.maxLength(10),Validators.pattern("^[A-Za-z][A-Za-z0-9]*$")]],
      password:["",[Validators.required,Validators.pattern("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}")]],
      confirmPassword:["",[Validators.required,Validators.pattern("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}")]],
      email: ["",[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}")]],
      orgId:["",[Validators.required,Validators.pattern("[0-9]*")]],
      roleId:["",Validators.required]  ,
      boss:[""]
    })
  }
  userRegister(){
    console.log(this.registerForm);  
    
    this.submit=true;
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      console.log(this.submit);
      return;
    }
  
   const formValues=this.registerForm.getRawValue();

   const userData : User= {
    firstname: formValues.firstname.trim(),
    lastname:formValues.lastname,
    username: formValues.username,
    password:formValues.password,
    email:formValues.email,
    orgId:formValues.orgId,
    roleId:formValues.roleId,
    reporting_officer_id:formValues.boss
  }
 
  console.log(userData);

  const apiUrl="http://localhost:8084/api/v1/admin/register";
  this.appService.postReturn(apiUrl, userData).subscribe((resp:any)=>{
    console.log("Registration Successful",resp);
      this.registerSuccess=true;
      window.alert("User Registration Successfull !")
      this.registerForm.reset();
      console.log(resp.response); 
  },(error)=>{
    this.errorMsg="Username or E-mail already exists!"        
   })
   
   this.submit=false;
 }
 getUsers() {
    
  this.appService.getReturn(`${environment.apiUrl}/api/v1/user/list`).subscribe(
    (data: any) => {
      this.users = data;
      console.log(this.users);
      
    },
    (error) => {
      console.error('Error fetching tasks:', error);
    }
  );
}


 getReportingOfficers(event:any) {
  const roleId = event.target.value  
 
  this.appService.getReturn(`${environment.apiUrl}/api/v1/admin/getReportingOfficerList/${roleId}`).subscribe(
    (data: any) => {
      this.reportingofficers = data;
      console.log(this.reportingofficers);
      
    },
    (error) => {
      console.error('Error fetching Reporting Officers', error);
    }
  );
 }

}

