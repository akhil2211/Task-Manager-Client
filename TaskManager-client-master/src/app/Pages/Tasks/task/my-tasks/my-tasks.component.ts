import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment.development';
import { AppService } from '../../../../Services/app-service.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.scss'
})
export class MyTasksComponent implements OnInit,OnChanges{
   mytasks:any[]=[];
   @Output() viewEvent=new EventEmitter<any>()
   @Input() taskName:string|null=null;
  newStatus: any;

  showTaskDetails(task:any){
    this.viewEvent.emit({
      data:task,
      taskType:"MyTask"
    });
  }

    constructor(private taskService: AppService,private api:AppService) { }
    ngOnChanges(changes: SimpleChanges): void {
      if(this.taskName){
        if(this.taskName !==""){
          let queryParams = new HttpParams();
          queryParams = queryParams.append("task",this.taskName);
          this.api.getReturn(`${environment.apiUrl}/api/v1/project/task/searchTask`,{params:queryParams}).subscribe((data:any)=>{
          this.mytasks=data
          console.log(this.mytasks);
          
        }
        ,(error)=>{
          console.log(error);      
        })
        }
      }
     
    }
   
  ngOnInit(): void {
    this.loadMyTasks();
  }
  loadMyTasks(){
    this.taskService.getReturn(`${environment.apiUrl}/api/v1/project/task/MyTasks`).subscribe(
      (data:any)=>{
        this.mytasks=data;
        console.log(this.mytasks);        
      },
      (error)=>{
        console.error('Error fetching My Tasks',error);
        
      });
      
    
  }
  onFilterStatus(event:any){
    this.newStatus = event.target.value;
    console.log(this.newStatus);
    
      this.api.getReturn(`${environment.apiUrl}/api/v1/project/task/${this.newStatus}/myTaskStatus`).subscribe((data:any)=>{
      console.log(data);
      this.mytasks = data;
            
    },(error)=>{
      console.log(error);
      
    })
  }

}
