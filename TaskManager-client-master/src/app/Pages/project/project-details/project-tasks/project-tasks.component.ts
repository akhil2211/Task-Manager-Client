import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

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

   
  showTaskDetails(task:any){
    this.viewEvent.emit({
      data:task
    });}

  ngOnInit(): void {
    console.log(this.taskList)
  }
}