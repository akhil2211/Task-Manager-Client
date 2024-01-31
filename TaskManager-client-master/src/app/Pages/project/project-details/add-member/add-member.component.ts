import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../../Services/app-service.service';
import { environment } from '../../../../../environments/environment.development';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ModalService } from '../../../../Services/modal.service';
 
@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.scss'
})
export class AddMemberComponent implements OnInit{
  @Input() projectData:any
  userList:any[]=[]
  selectedList:any[]=[]
  userIds:any[]=[]
  user: any;
  userRoleId: any;

 
  constructor(private api:AppService,private modalService:ModalService, private viewContainerRef:ViewContainerRef ){}
 
  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    console.log(this.user);
    this.userRoleId = JSON.parse(this.user).role_id;
   
    console.log(this.projectData.currentUsers);
   
    this.api.getReturn(`${environment.apiUrl}/api/v1/user/getLowerLevelUser/${this.userRoleId}`).subscribe((data:any)=>{
      this.userList = data.filter((obj1:any) => !this.projectData.currentUsers.some((obj2:any) => obj1.id === obj2.id));
      console.log(this.userList);
    },(error)=>console.log(error))
  }
  searchName(event:any){
    const searchName = event.target.value
    if(searchName !==""){
      let queryParams = new HttpParams();
      queryParams = queryParams.append("value",searchName);
      this.api.getReturn(`${environment.apiUrl}/api/v1/user/search`,{params:queryParams}).subscribe((data:any)=>{
      this.userList = data.filter((obj1:any) => !this.projectData.currentUsers.some((obj2:any) => obj1.id === obj2.id));
    }
    ,(error)=>{
      console.log(error);      
    })
    }
    else{
      this.api.getReturn(`${environment.apiUrl}/api/v1/user/getLowerLevelUser/${this.userRoleId}`).subscribe(
        (data: any) => {
          this.userList = data.filter((obj1:any) => !this.projectData.currentUsers.some((obj2:any) => obj1.id === obj2.id));
        },
        (error) => {
          console.error('Error fetching projects:', error);
        }
      );
    }
  }
  addUser(item:any){
    this.projectData.currentUsers.map((obj:any)=>{
       
    })
    
    this.selectedList.push(item)
  }
  isUserSelected(item:any){
    if(this.selectedList.includes(item)){
      return false;
    }else{
      return true;
    }
  }
  removeUser(item:any){    
    
    this.selectedList = this.selectedList.filter(obj => {
      return obj !== item
    });
    }
  

  

  assignProject(){
    if(this.selectedList.length!=0){
      this.selectedList.map((value)=>{
        this.userIds.push(value.id)
      })
      console.log(this.selectedList);
     
      const reqBody = {
        userIds:this.userIds
      }
      console.log(reqBody);

     
      const headers = new HttpHeaders().set("ResponseType","text")
      this.api.postReturn(`${environment.apiUrl}/api/v1/project/${this.projectData.projectId}/assign`,reqBody,{headers}).subscribe((data:any)=>{
        window.alert("User Assigned Successfully!")
        this.selectedList.map((obj)=>{

          this.projectData.currentUsers.push(obj)

        })
        console.log(this.projectData.currentUsers);
        
        this.selectedList=[];
        this.ngOnInit()
      },(error)=>console.log(error))
     
    }
  }
}
 