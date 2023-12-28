import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProjectComponent } from './list-project/list-project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ModalService } from '../../Services/modal.service';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AppService } from '../../Services/app-service.service';


@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule,ListProjectComponent,AddProjectComponent,ProjectDetailsComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {

  constructor(private modalService:ModalService,private viewContainerRef:ViewContainerRef,private api:AppService){}

  showProjectDetails:boolean=false;
  projectDetails:any;
  searchName:string="";
  ngOnInit(): void {
    this.showProjectDetails=false;   
  }
  viewEventDetails(event:any){
    if(event){
      this.showProjectDetails=true;
      this.projectDetails=event;
    }

  }
  showCreateProject(){  
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    this.modalService.addDynamicComponent("createProject", null);
  }
    
   searchProject(event: any) {    
    this.searchName = event.target.value

    
  }
}

 



