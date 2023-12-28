import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../Services/modal.service';
import { AppService } from '../../../Services/app-service.service';
import { environment } from '../../../../environments/environment.development';
import { error } from 'console';
import { HttpHeaderResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit{
  @Input() project:any;
  userList:any[]=[]

  constructor(private modalService:ModalService,private viewContainerRef:ViewContainerRef,private api:AppService){}

  ngOnInit(): void {
    console.log(this.project);
    this.api.getReturn(`${environment.apiUrl}/api/v1/project/${this.project.id}/userlist`).subscribe((data:any)=>{
      this.userList = data
    },(error)=>{
      console.log(error);      
    })
    
  }

    onAddClick(){
      this.modalService.setRootViewContainerRef(this.viewContainerRef);
      this.modalService.addDynamicComponent("addMember", {
        projectId:this.project.id,
        currentUsers:this.userList
      });
  }
  onRemoveClick(userId:number){
    const headers=new HttpHeaders().set("ResponseType","text");


    this.api.deleteReturn(`${environment.apiUrl}/api/v1/gm/removeMember/${userId}/${this.project.id}`,{headers}).subscribe((data:any)=>{
      console.log(data);
      this.ngOnInit()
      
  },(error)=>{
    console.log(error);
    
    
  }
  )

}
}
