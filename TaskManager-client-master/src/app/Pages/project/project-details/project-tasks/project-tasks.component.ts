import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment.development';
import { AppService } from '../../../../Services/app-service.service';

@Component({
  selector: 'app-project-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-tasks.component.html',
  styleUrl: './project-tasks.component.scss'
})
export class ProjectTasksComponent implements OnInit {
   @Input() taskList:any[]=[]
   @Output() viewEvent=new EventEmitter<any>()
   @Input() projectName: any;
   newStatus: any;
   @Input() project:any;
   initialTasks:any[]=[]

   constructor(private api:AppService){}
 
  ngOnInit(): void {
    console.log(this.taskList)
    console.log(this.project);
    this.initialTasks=this.taskList;
    
  }
  
  onFilterStatus(event:any){
    this.newStatus = event.target.value;
    console.log(this.newStatus);
    if(event.target.value=="Default"){
      this.taskList=this.initialTasks;
    }

    else{
    
      this.api.getReturn(`${environment.apiUrl}/api/v1/gm/${this.newStatus}/tasks/${this.project.id}`).subscribe((data:any)=>{
      console.log(data);
      this.taskList = data;
            
    },(error)=>{
      console.log(error);
      
    })
  }

}
}