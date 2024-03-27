import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../Services/app-service.service';
import { ListTaskComponent } from './list-task/list-task.component';
import { ModalService } from '../../../Services/modal.service';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule,ListTaskComponent,TaskDetailsComponent,CreateTaskComponent,MyTasksComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
 
export class TaskComponent implements OnInit {
  user: any;
  userRole: any;

  constructor(private modalService:ModalService,private viewContainerRef:ViewContainerRef,private api:AppService){}

  showTaskDetails:boolean=false;
  taskDetails:any;
  showMyTasks:boolean=false;
  showAssignedTasks:boolean=true;

 showCreateTask() { 
  this.modalService.setRootViewContainerRef(this.viewContainerRef);
  this.modalService.addDynamicComponent("createTask", null);
}
  ngOnInit(): void {
    this.user=localStorage.getItem("user");   
    console.log(this.user);
     this.userRole=JSON.parse(this.user).roles;
     if(this.userRole=="GM"){
      this.showMyTasks=false;
     }
     else{
      this.showMyTasks=true;
     }
   

    this.showTaskDetails=false;
  }
  viewEventDetails(event:any){
    if(event){
      this.showTaskDetails=true;
      this.taskDetails=event;

    }
  }
  
 
}