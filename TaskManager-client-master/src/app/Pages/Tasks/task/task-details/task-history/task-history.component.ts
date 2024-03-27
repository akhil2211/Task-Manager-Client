import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../../Services/data.service';

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
  showPopupFlag :boolean= false;   
  selectedHistory: any = {};

  constructor(private dataService:DataService){}
 
 ngOnInit(): void {
   console.log(this.historyList)

   this.historyList.map((history:any)=>{
    
    history.assigned_date=this.dataService.extractDate(history.assigned_at)
    history.assigned_time=this.dataService.HHMMFormatter(history.assigned_at)
    if(history.unassigned_at!=null){
    history.unassigned_date=this.dataService.extractDate(history.unassigned_at)
    history.unassigned_time=this.dataService.HHMMFormatter(history.unassigned_at) 
 } })

 } 
}






