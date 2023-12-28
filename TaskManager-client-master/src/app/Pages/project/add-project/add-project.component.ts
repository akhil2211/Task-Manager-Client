import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../../../Services/app-service.service';
import { Router } from '@angular/router';
import { Project } from '../../../Models/data';
import { environment } from '../../../../environments/environment.development';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})

export class AddProjectComponent implements OnInit {

  projectForm !: FormGroup ;
  submit:boolean=false;
  projectSuccess: boolean | any;
  errorMsg:string | any;
  userDetails:string|any;
  orgId:number|any;

  constructor(private formBuilder : FormBuilder, private projectService : AppService, private router: Router){}
   ngOnInit(){
    this.projectForm=this.formBuilder.group({
      
      project_code:["",Validators.required],
      project_name:["",Validators.required],
      project_description:["",Validators.required],
      due_date:["",Validators.required],
      project_status:["",Validators.required]
    
   })
 }
 createProject(){
   console.log(this.projectForm);
   
   this.submit=true;
   if(this.projectForm.invalid){
     this.projectForm.markAllAsTouched();
     console.log(this.submit);
     return;
   }
 
  const formValues=this.projectForm.getRawValue();

  const projectData : Project= {
    project_code: formValues.project_code,
    project_name:formValues.project_name,
    project_description: formValues.project_description,
    due_date:formValues.due_date,
    project_status:formValues.project_status   
 }

 console.log(projectData);
 const headers = new HttpHeaders().set('ResponseType','text')
 this.userDetails=localStorage.getItem("user");

 this.orgId=JSON.parse(this.userDetails).organization.id;
 this.projectService.postReturn(`${environment.apiUrl}/api/v1/gm/${this.orgId}/create`, projectData,{headers}).subscribe((resp:any)=>{
   console.log("Project Created Successfully",resp);
     this.projectSuccess=true;
     window.alert("Project Created Successfully!")
     this.projectForm.reset();
     console.log(resp.response);    
  })
  
  this.submit=false;
}
}
