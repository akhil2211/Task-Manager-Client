import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../Services/app-service.service';
import { environment } from '../../../environments/environment.development';
import { HttpHeaders } from '@angular/common/http';
import { TaskCategory } from '../../Models/data';


@Component({
  selector: 'app-task-category',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './task-category.component.html',
  styleUrl: './task-category.component.scss'
})

export class TaskCategoryComponent implements OnInit{

  catForm !: FormGroup ;
  submit:boolean=false;
  catSuccess: boolean | any;
  errorMsg:string | any;


  constructor(private formBuilder : FormBuilder, private catService : AppService, private router: Router){}
   ngOnInit(){
    this.catForm=this.formBuilder.group({
      Category:["",Validators.required],
      
   })
 }
   createCategory(){
    console.log(this.catForm);
    
   this.submit=true;
   if(this.catForm.invalid){
     this.catForm.markAllAsTouched();
     console.log(this.submit);
     return;
   }
 
  const formValues=this.catForm.getRawValue();

  const categoryData : TaskCategory= {
    Category: formValues.Category,
    
 }

 console.log(categoryData);
 const headers = new HttpHeaders().set('ResponseType','text')
 
 this.catService.postReturn(`${environment.apiUrl}/api/v1/admin/createCategory`, categoryData,{headers}).subscribe((resp:any)=>{
   console.log("Category Created Successfully",resp);
     this.catSuccess=true;
     window.alert("Category Created Successfully !")
     this.catForm.reset();
     console.log(resp.response);   
     },(error=>{
      console.error(error);
      
     }))
  
  this.submit=false;
}
}
