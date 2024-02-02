import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment.development';
import { Project, Task } from '../../../../Models/data';
import { AppService } from '../../../../Services/app-service.service';
import { Router } from '@angular/router';
import { error } from 'console';


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
  minDate: any;
  user: any;
  userRole: any;
  


  constructor(private formBuilder : FormBuilder, private projectService : AppService, private router: Router){}
   ngOnInit(){
    this.user=localStorage.getItem("user");   
    this.userRole=JSON.parse(this.user).roles;

    this.projectService.getReturn(`${environment.apiUrl}/api/v1/user/projects`).subscribe(
      (data: any) => {
        this.projects = data;
     
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
      t_status:["Active",Validators.required],
      assigned_to:[null,Validators.required],
      project_id:[null,Validators.required],
      category_id:[null,Validators.required],
      priority_id:[null,Validators.required]    

   })
   this.minDate = new Date().toISOString().split('T')[0];
 }

 createTask(){  
  
   this.submit=true;
   console.log(this.taskForm);
   
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
     this.taskCreateSuccess=true;
   
    window.alert("Task Created Successfully!");
     this.taskForm.reset();
     console.log(resp.response);    
  },(error)=>{
    this.errorMsg="Task Code  or Task Title already exists!"    

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
      console.log(data);
      
      this.projectUsers = data.filter((obj:any)=>{
     
     
        if(this.userRole=="USER" && obj.id!=JSON.parse(this.user).id){
          console.log("IN USER");
          
          return obj.roles=="USER"
        }
           else if(this.userRole=="PM" && obj.id!=JSON.parse(this.user).id){
            console.log("IN PM");
            return obj.roles=="PM" || obj.roles=="USER"
                
           }
           else if(this.userRole=="GM" && obj.id!=JSON.parse(this.user).id){
            console.log("IN GM");
            return obj.roles=="PM" || obj.roles=="USER" || obj.roles=="GM" 
           }
        else{
          console.log("Hi");
          
          return null;

        }
      })
    
    },(error)=>{
      console.log(error);      
    })
  }
}
}


