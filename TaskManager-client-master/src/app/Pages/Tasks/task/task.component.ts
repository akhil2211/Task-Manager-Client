import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../Services/app-service.service';
import { environment } from '../../../../environments/environment.development';
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

  constructor(private modalService:ModalService,private viewContainerRef:ViewContainerRef,private api:AppService){}

  showTaskDetails:boolean=false;
  taskDetails:any;
  searchTaskName:string="";

 showCreateTask() { 
  this.modalService.setRootViewContainerRef(this.viewContainerRef);
  this.modalService.addDynamicComponent("createTask", null);
}
  ngOnInit(): void {
    this.showTaskDetails=false;
  }
  viewEventDetails(event:any){
    if(event){
      this.showTaskDetails=true;
      this.taskDetails=event;
    }
  }
  
  searchTask(event: any) {    
    this.searchTaskName = event.target.value
    
  }

}