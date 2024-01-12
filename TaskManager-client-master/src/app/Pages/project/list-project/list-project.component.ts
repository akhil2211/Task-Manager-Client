import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../Services/app-service.service';
import { environment } from '../../../../environments/environment.development';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-list-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-project.component.html',
  styleUrl: './list-project.component.scss'
})
export class ListProjectComponent implements OnInit,OnChanges {

  projects: any[] = [];
  @Input() projectName:string|null=null;
  @Output() viewEvent=new EventEmitter<any>()
  newStatus: any;
 
  constructor(private projectService: AppService,private api:AppService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.projectName){
      if(this.projectName !==""){
        let queryParams = new HttpParams();
        queryParams = queryParams.append("project",this.projectName);
        this.api.getReturn(`${environment.apiUrl}/api/v1/project/searchProject`,{params:queryParams}).subscribe((data:any)=>{
        this.projects=data
        console.log(this.projects);
      }
      ,(error)=>{
        console.log(error);      
      })
      }     
    }
    else{
      this.loadProjects();
    }
  }
 
  ngOnInit(): void {
    
    this.loadProjects();
    
  }
  loadProjects() {
  
    this.projectService.getReturn(`${environment.apiUrl}/api/v1/gm/projectList`).subscribe(
      (data: any) => {
        this.projects = data;
        console.log(this.projects);
        
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  
  }
  
  showDetails(project:any){
  this.viewEvent.emit(project);
  }

  onFilterStatus(event:any) {
       this.newStatus = event.target.value;
       console.log(this.newStatus);
       
     if(event.target.value=="Default"){
        this.loadProjects();
       }
     else{
      this.api.getReturn(`${environment.apiUrl}/api/v1/gm/${this.newStatus}/ProjectStatus`).subscribe((data:any)=>{
      console.log(data);
      this.projects = data;
            
    },(error)=>{
      console.log(error);
      
    })
    }
  }
}
