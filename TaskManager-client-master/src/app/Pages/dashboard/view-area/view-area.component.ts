import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../../Tasks/task/task.component';
import { DataService } from '../../../Services/data.service';
import { UserComponent } from '../../user/user.component';
import { RegisterComponent } from '../../register/register.component';
import { OrganizationComponent } from '../../organization/organization.component';
import { TaskCategoryComponent } from '../../task-category/task-category.component';
import { AddProjectComponent } from '../../project/add-project/add-project.component';
import { ProjectComponent } from '../../project/project.component';
import { ListTeamComponent } from '../../list-team/list-team.component';
import { TeamComponent } from '../team/team.component';

@Component({
    selector: 'app-view-area',
    standalone: true,
    templateUrl: './view-area.component.html',
    styleUrl: './view-area.component.scss',
    imports: [CommonModule, UserComponent, RegisterComponent, OrganizationComponent, TaskCategoryComponent, TaskComponent, ProjectComponent, TaskComponent, TeamComponent]
})
export class ViewAreaComponent implements OnInit{
  constructor(private dataService:DataService){}
  comp: string |any

   ngOnInit(): void {
   this.dataService.notifyObservale$.subscribe((data:any) =>{
  console.log(data);
  this.comp=data;
   })
 }
}
