import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../../Services/app-service.service';
import { environment } from '../../../../../environments/environment.development';
import { HttpHeaders } from '@angular/common/http';
import { CommentsComponent } from './comments/comments.component';
import { TaskHistoryComponent } from './task-history/task-history.component';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule,CommentsComponent,TaskHistoryComponent],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit {

  @Input() taskInfo:any;
  task:any
  @Output() viewEvent=new EventEmitter<any>()
  @Output() editSuccessEvent = new EventEmitter<any>()
  @ViewChild("selectStatus") selectStatus:any
  @ViewChild("selectTaskHolder") selectTaskHolder:any
  userRole:any
  user:any
  newAssignedToId:any
  newAssignedTo:any
  newStatus:any
  status:any
  assignedTo:any
  isStatusOptionOpened:boolean=false
  showRequiredDetails:boolean=false
  isAssignedToOptionOpened:boolean=false
  projectUsers:any[] =[]
  taskHistoryData: any;
  isTaskHistoryOpen:any;


  constructor (private api:AppService){}
  ngOnInit(): void {
    this.task=this.taskInfo.data
    this.user=localStorage.getItem("user");   
    console.log(this.user);
     this.userRole=JSON.parse(this.user).roles;
     if(this.taskInfo.taskType=="AssignedTask"){
      this.showRequiredDetails=true;
     }
     else{
      this.showRequiredDetails=false;
     }
     console.log(this.userRole);
    
    console.log(this.task);
    this.status=this.task.t_status
    this.assignedTo=this.task.firstname+" "+this.task.lastname
    
  }
  changeStatus(){
    this.isStatusOptionOpened = true
  }
  changeAssignedTo(){
      this.api.getReturn(`${environment.apiUrl}/api/v1/project/${this.task.project_id}/userlist`).subscribe((data:any)=>{
      this.projectUsers = data
      if(this.projectUsers.length!=0){

        this.isAssignedToOptionOpened=true
      }
      else{        
      window.alert("No Task Holder Available.")
      }
    },(error)=>{
      console.log(error);      
    })
  }
  getHolderValue(event:any){
    this.newAssignedTo = event.target.selectedOptions[0].text    
  }
 
  onChangeAssignedTo(){
    
    this.newAssignedToId = this.selectTaskHolder.nativeElement.value;
    console.log(this.newAssignedToId,this.assignedTo);
    
    if(this.newAssignedTo==this.task.assignedTo){
      window.alert("Please Assign a new Task Holder!");
      return
    }
    const reqBody = {
      newTaskHolderId:this.newAssignedToId
    }
    console.log(reqBody);
    
    const headers = new HttpHeaders().set("ResponseType","text")
    this.api.postReturn(`${environment.apiUrl}/api/v1/project/task/${this.task.id}/editTask`,reqBody,{headers}).subscribe((data:any)=>{
      console.log(data);
      this.isAssignedToOptionOpened=false
      this.newAssignedTo = this.selectTaskHolder.nativeElement.selectedOptions[0].text    
      this.assignedTo = this.newAssignedTo
       
      window.alert("Task Holder Changed.")
    },(error)=>{
   
    })
  }
  onChangeStatus(){
    this.newStatus = this.selectStatus.nativeElement.value;
    const reqBody = {
      newTaskStatus:this.newStatus
    }
    console.log(reqBody,this.newStatus);
    
    const headers = new HttpHeaders().set("ResponseType","text")
    this.api.postReturn(`${environment.apiUrl}/api/v1/project/task/${this.task.id}/editTaskStatus`,reqBody,{headers}).subscribe((data:any)=>{
      console.log(data);
      this.isStatusOptionOpened=false
      this.status = this.newStatus
      window.alert("Task Status Changed.")
    },(error)=>{
      console.log(error);
      
    })
  }

  showTaskHistory(task:any) {

        this.api.getReturn(`${environment.apiUrl}/api/v1/project/task/${this.task.id}/taskHistory`).subscribe((data:any)=>{
        this.taskHistoryData = data
        this.isTaskHistoryOpen=true;
    
        console.log(data);
      },(error)=>{
        console.log(error);      
      })  
       
   
        this.viewEvent.emit(this.taskHistoryData);
        
      }
    }




