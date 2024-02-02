import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../Services/modal.service';
import { AppService } from '../../../Services/app-service.service';
import { environment } from '../../../../environments/environment.development';
import { HttpHeaders } from '@angular/common/http';
import { ProjectTasksComponent } from './project-tasks/project-tasks.component';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule,ProjectTasksComponent],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit{
  @Input() project:any;
  @Output() viewEvent=new EventEmitter<any>()
  userList:any[]=[]
  taskDetails: any;
  isTaskList:boolean=false;
  taskList:any[]=[];
  user: any;
  userRole: any;

  constructor(private modalService:ModalService,private viewContainerRef:ViewContainerRef,private api:AppService){}

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.userRole = JSON.parse(this.user).roles;    

    console.log(this.project);
    this.api.getReturn(`${environment.apiUrl}/api/v1/project/${this.project.id}/userlist`).subscribe((data:any)=>{
      this.userList = data
    },(error)=>{
      console.log(error);      
    })
    
  }

    onAddClick(){
      this.modalService.setRootViewContainerRef(this.viewContainerRef);
      this.modalService.addDynamicComponent("addMember", {
        projectId:this.project.id,
        currentUsers:this.userList
      });
  }
  onRemoveClick(userId:number){
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    this.modalService.addDynamicComponent("remove", "Are you sure you want to remove this member?").then((value)=>{
      if(value){
        const headers=new HttpHeaders().set("ResponseType","text");
    
        this.api.deleteReturn(`${environment.apiUrl}/api/v1/project/removeMember/${userId}/${this.project.id}`,{headers}).subscribe((data:any)=>{
        console.log(data);
        this.ngOnInit()
          
      },(error)=>{
        console.log(error);    
        
      }
      )
   }
 });
    }
   

showProjectTasks(taskDetails:any){

  this.api.getReturn(`${environment.apiUrl}/api/v1/project/task/${this.project.id}/task`).subscribe((data:any)=>{
    this.taskList = data
    this.isTaskList=true;
    console.log(data);
  },(error)=>{
    console.log(error);      
  })  
  
    this.viewEvent.emit(this.taskList);
    
  }
}
