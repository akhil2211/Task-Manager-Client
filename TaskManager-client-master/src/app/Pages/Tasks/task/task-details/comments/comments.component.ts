import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../../environments/environment.development';
import { AppService } from '../../../../../Services/app-service.service';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../../../../Services/data.service';
import { ModalService } from '../../../../../Services/modal.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {

  comments: any[] = [];
  @Input() taskId: any;
  commForm !: FormGroup ;
  submit:boolean=false;
  lastMessageTime: any;
  user: any;
  userId: any;
  
 
  constructor(private commentService: AppService,private formBuilder : FormBuilder,private dataService:DataService,private modalService:ModalService,private viewContainerRef:ViewContainerRef ) { }
 
  ngOnInit(): void {
     this.loadComments();
     this.commForm=this.formBuilder.group({
     comm_body:["",Validators.required]       
   })
     
   if(typeof localStorage!=="undefined" && localStorage.getItem("user")){
    this.user = localStorage.getItem("user");
    this.userId = JSON.parse(this.user).id;
   }

  }

  addComment(){

    if(this.commForm.invalid){
      this.commForm.markAllAsTouched();
      console.log(this.submit);
      return;
        }
    const formValues= this.commForm.getRawValue(); 

    const reqBody= {
      comm_body: formValues.comm_body
    }
    console.log(reqBody,this.commForm);
    
     const headers = new HttpHeaders().set("ResponseType","text")
      this.commentService.postReturn(`${environment.apiUrl}/api/v1/comments/add/${this.taskId}`,reqBody,{headers}).subscribe((data:any)=>{
 
        this.loadComments();
        this.commForm.reset();
        
        
      },(error)=>console.log(error))     }
    
  
  loadComments() {
    this.commentService.getReturn(`${environment.apiUrl}/api/v1/comments/all/${this.taskId}`,).subscribe(
      (data: any) => {
        this.comments = data;
       
        
        this.comments.map((comment:any)=>{
          comment.date=this.dataService.extractDate(comment.comm_created_at)
          comment.time=this.dataService.HHMMFormatter(comment.comm_created_at)
          console.log(comment.user.id,this.userId);
        })
        
      },
      (error) => {
        console.error('Error fetching comments.', error);
      }
    );  
    
  }
    
  removeComment(commentId:number){

    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    this.modalService.addDynamicComponent("remove", "Are you sure you want to delete this comment?").then((value)=>{
      if(value){
        const headers=new HttpHeaders().set("ResponseType","text");
    
    this.commentService.deleteReturn(`${environment.apiUrl}/api/v1/comments/delete/${commentId}`,{headers}).subscribe((data:any)=>{
      console.log(data);
      this.ngOnInit();
         
  },(error)=>{
    console.log(error);    
    
  })

      }
    });  

}
  
}





