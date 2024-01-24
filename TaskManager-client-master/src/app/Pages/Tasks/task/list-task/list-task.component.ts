import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment.development';
import { AppService } from '../../../../Services/app-service.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.scss'
})
export class ListTaskComponent implements OnInit,OnChanges {

  
  tasks: any[] = [];
  @Output() viewEvent=new EventEmitter<any>()
  @Input() taskName:string|null=null;
  selectStatus: any;
  task: any;
  status: any;
  isStatusFilterOpened:boolean=false
  projectUsers: any;
  assignToList:any[]=[]
  assignedTo: any;
  selectedStatus: any;
  searchTaskName:string="";
  tempTasks:any[]=[];

  showTaskDetails(task:any){
    this.viewEvent.emit({
      data:task,
      taskType:"AssignedTask"
    });}

  constructor(private taskService: AppService,private api:AppService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.taskName){
      if(this.taskName !==""){
        let queryParams = new HttpParams();
        queryParams = queryParams.append("task",this.taskName);
        this.api.getReturn(`${environment.apiUrl}/api/v1/project/task/searchTask`,{params:queryParams}).subscribe((data:any)=>{
        this.tasks=data
        console.log(this.tasks);        
      }

      ,(error)=>{
        console.log(error);      
      })
      }
      
    }
    else{
      this.loadTasks();
    }
   
  }
 
  ngOnInit(): void {
    this.loadTasks();   
   
  }
 
  loadTasks() {
    
    this.taskService.getReturn(`${environment.apiUrl}/api/v1/project/task/AssignedTasks`).subscribe(
      (data: any) => {
        this.tasks = data;
        this.tempTasks=this.tasks;
        console.log(this.tasks);
        this.tasks.map((task)=>{
          if (this.assignToList.indexOf(task.firstname+" "+task.lastname)==-1) this.assignToList.push(task.firstname+" "+task.lastname);
        }
        )
        
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  onFilterAssigned(event:any){
    this.assignedTo = event.target.value;
    console.log(this.assignedTo);
    if(event.target.value=="Show All"){
      this.loadTasks();
    }
    else{
    
      this.api.getReturn(`${environment.apiUrl}/api/v1/project/task/filterTasks/${this.assignedTo}`).subscribe((data:any)=>{
      console.log(data);
      this.tasks = data;
            
    },(error)=>{
      console.log(error);
      
    })
  }

  }

  onFilterStatus(event:any){
    this.selectedStatus = event.target.value;
    console.log(this.selectedStatus);
    if(event.target.value=="Default"){
      this.loadTasks();
    }
    else{
    
      this.api.getReturn(`${environment.apiUrl}/api/v1/project/task/${this.selectedStatus}/assignedTaskStatus`).subscribe((data:any)=>{
      console.log(data);
      this.tasks = data;
            
    },(error)=>{
      console.log(error);
      
    })
 }

}
searchTask(event: any) {    
  this.tasks= this.tempTasks  
  this.searchTaskName = event.target.value
  this.tasks=this.tasks.filter((task:any)=>{ 
    const taskTitle=task.t_title.toLocaleLowerCase()
    return taskTitle.includes(this.searchTaskName.toLocaleLowerCase())
  })
  console.log(this.tasks);
  
}


}