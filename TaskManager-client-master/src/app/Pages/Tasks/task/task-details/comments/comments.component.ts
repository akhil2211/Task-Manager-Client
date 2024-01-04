import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../../environments/environment.development';
import { AppService } from '../../../../../Services/app-service.service';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../../../../Services/data.service';

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
  
 
  constructor(private commentService: AppService,private formBuilder : FormBuilder,private dataService:DataService) { }
 
  ngOnInit(): void {
     this.loadComments();
     this.commForm=this.formBuilder.group({
     comm_body:["",Validators.required]       
   })
  }

  addComment(){
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
        this.comments.map((comment)=>{
          comment.date=this.dataService.extractDate(comment.comm_created_at)
          comment.time=this.dataService.HHMMFormatter(comment.comm_created_at)
        })
        
      },
      (error) => {
        console.error('Error fetching comments.', error);
      }
    );
    
    
  }
  
}


