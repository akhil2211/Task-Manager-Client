import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-history.component.html',
  styleUrl: './task-history.component.scss'
})
export class TaskHistoryComponent implements OnInit{
  @Input() historyList:any[]=[]  
  @Output() viewEvent=new EventEmitter<any>()



 ngOnInit(): void {
   console.log(this.historyList)
 }
}


