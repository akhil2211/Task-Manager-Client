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
  styleUrls: ['./list-project.component.scss'] // Use 'styleUrls' instead of 'styleUrl'
})
export class ListProjectComponent implements OnInit, OnChanges {

  projects: any[] = [];
  @Input() projectName: string | null = null;
  @Output() viewEvent = new EventEmitter<any>();
  newStatus: any;
  user: any;
  userRole: any;
  tempProjects:any[]=[];
  

  constructor(private projectService: AppService, private api: AppService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.user = localStorage.getItem("user");
    console.log(this.user);
    this.userRole = JSON.parse(this.user).roles;

    if (this.projectName) {
      if (this.projectName !== "") {
            this.projects=this.projects.filter((obj:any)=>{
          return obj.project_name.toLocaleLowerCase().includes(this.projectName)
        })
      }
    } else {
      if (this.userRole == "ADMIN") {
        this.loadAllProjects();
      } else {
        this.loadProjects();
      }
    }
  }

  ngOnInit(): void {
    if (this.userRole == "ADMIN") {
      this.loadAllProjects();
    } else {
      this.loadProjects();
    }
  }


    loadAllProjects() {
      this.projectService.getReturn(`${environment.apiUrl}/api/v1/project/projectList`).subscribe(
        (data: any) => {
          this.projects = data;
          console.log(this.projects);
          this.tempProjects=this.projects;
        },
        (error) => {
          console.error('Error fetching All projects:', error);
        }
      );
    }
  

    loadProjects() {
      this.projectService.getReturn(`${environment.apiUrl}/api/v1/user/projects`).subscribe(
        (data: any) => {
          this.projects = data;
          console.log(this.projects);
          this.tempProjects=this.projects;
        },
        (error) => {
          console.error('Error fetching projects:', error);
        }
      );
    }
  

  showDetails(project: any) {
    this.viewEvent.emit(project);
  }

  onFilterStatus(event: any) {
    this.newStatus = event.target.value;
    console.log(this.newStatus);

    if (event.target.value == "Default") {
      if (this.userRole == "ADMIN") {
        this.loadAllProjects();
      } else {
        this.loadProjects();
      }      
     } 

    else {
         this.projects=this.tempProjects;
          this.projects=this.projects.filter((obj)=>{
          return  obj.project_status==this.newStatus;
          })
    }
  }
 
}

