import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../../Services/app-service.service';
import { environment } from '../../../../../environments/environment.development';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit {
  @Input() task:any;
  @Output() editSuccessEvent = new EventEmitter<any>()
  @ViewChild("selectStatus") selectStatus:any
  @ViewChild("selectTaskHolder") selectTaskHolder:any
  newAssignedToId:any
  newAssignedTo:any
  newStatus:any
  status:any
  asignedTo:any
  isStatusOptionOpened:boolean=false
  isAssignedToOptionOpened:boolean=false
  projectUsers:any[] =[]

  constructor (private api:AppService){}
  ngOnInit(): void {
    console.log(this.task);
    this.status=this.task.t_status
    this.asignedTo=this.task.firstname+" "+this.task.lastname
  }
  changeStatus(){
    this.isStatusOptionOpened = true
  }
  changeAssignedTo(){
    this.api.getReturn(`${environment.apiUrl}/api/v1/project/${this.task.project_id}/userlist`).subscribe((data:any)=>{
      this.projectUsers = data
      this.isAssignedToOptionOpened=true
    },(error)=>{
      console.log(error);      
    })
  }
  getHolderValue(event:any){
    this.newAssignedTo = event.target.selectedOptions[0].text    
  }
 
  onChangeAssignedTo(){
    
    this.newAssignedToId = this.selectTaskHolder.nativeElement.value;
    const reqBody = {
      newTaskHolderId:this.newAssignedToId
    }
    console.log(reqBody);
    
    const headers = new HttpHeaders().set("ResponseType","text")
    this.api.postReturn(`${environment.apiUrl}/api/v1/project/task/${this.task.id}/editTask`,reqBody,{headers}).subscribe((data:any)=>{
      console.log(data);
      this.isAssignedToOptionOpened=false
      this.newAssignedTo = this.selectTaskHolder.nativeElement.selectedOptions[0].text    
      this.asignedTo = this.newAssignedTo
       
      window.alert("Task Holder Changed.")
    },(error)=>{
      console.log(error);
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

}


