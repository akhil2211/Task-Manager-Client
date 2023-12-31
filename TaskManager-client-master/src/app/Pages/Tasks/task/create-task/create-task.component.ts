import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment.development';
import { Project, Task } from '../../../../Models/data';
import { AppService } from '../../../../Services/app-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {

  taskForm !: FormGroup ;
  submit:boolean=false;
  taskCreateSuccess: boolean | any;
  errorMsg:string | any;
  categoryList:any[]=[]
  priorityList:any[]=[]
  projects: any[] = [];
  projectUsers:any[] = []


  constructor(private formBuilder : FormBuilder, private projectService : AppService, private router: Router){}
   ngOnInit(){

    this.projectService.getReturn(`${environment.apiUrl}/api/v1/gm/projectList`).subscribe(
      (data: any) => {
        this.projects = data;
        console.log(this.projects);        
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
    this.getTaskCategory();
    this.getTaskPriority()
  

    this.taskForm=this.formBuilder.group({
      
      t_title:["",Validators.required],
      t_code:["",Validators.required],
      t_description:["",Validators.required],
      duedate:["",Validators.required],
      t_status:["",Validators.required],
      assigned_to:[null,Validators.required],
      project_id:[null,Validators.required],
      category_id:[null,Validators.required],
      priority_id:[null,Validators.required]    
   })
 }
 createTask(){
  
   this.submit=true;
   if(this.taskForm.invalid){
     this.taskForm.markAllAsTouched();
     console.log(this.submit);
     return;
   }
 
  const formValues=this.taskForm.getRawValue();

  const taskData : Task= {
    t_title: formValues.t_title,
    t_code: formValues.t_code,
    t_description: formValues.t_description,
    duedate: formValues.duedate,
    t_status: formValues.t_status,
    assignedto: formValues.assigned_to,
    project_id: formValues.project_id,
    c_id: formValues.category_id,
    priority_id: formValues.priority_id,
  }
  const headers = new HttpHeaders().set("ResponseType","text")
 this.projectService.postReturn(`${environment.apiUrl}/api/v1/project/task/create`,taskData,{headers}).subscribe((resp:any)=>{
   console.log("Task Created Successfully",resp);
     this.taskCreateSuccess=true;
     window.alert("Task Created Successfully!")
     this.taskCreateSuccess.reset();
     console.log(resp.response);    
  })
  
  this.submit=false;
}
getTaskCategory(){
  this.projectService.getReturn(`${environment.apiUrl}/api/v1/project/task/category`).subscribe((data:any)=>{
    this.categoryList = data
  },(error)=>console.log(error))
}
getTaskPriority(){
  this.projectService.getReturn(`${environment.apiUrl}/api/v1/project/task/priority`).subscribe((data:any)=>{
    this.priorityList = data
  },(error)=>console.log(error))
}

onProjectChange(event:any){
  const projectId = event.target.value
  if(projectId){
    this.projectService.getReturn(`${environment.apiUrl}/api/v1/project/${projectId}/userlist`).subscribe((data:any)=>{
      this.projectUsers = data
    },(error)=>{
      console.log(error);      
    })
  }
}
}