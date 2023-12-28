import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../../Services/app-service.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Organization } from '../../Models/data';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent implements OnInit{

  orgForm !: FormGroup ;
  submit:boolean=false;
  orgSuccess: boolean | any;
  errorMsg:string | any;


  constructor(private formBuilder : FormBuilder, private orgService : AppService, private router: Router){}
   ngOnInit(){
    this.orgForm=this.formBuilder.group({
      org_name:["",Validators.required],
      org_code:["",Validators.required]  
   })
 }
   createOrg(){
    console.log(this.orgForm);
    
   this.submit=true;
   if(this.orgForm.invalid){
     this.orgForm.markAllAsTouched();
     console.log(this.submit);
     return;
   }
 
  const formValues=this.orgForm.getRawValue();

  const orgData : Organization= {
    org_name: formValues.org_name,
    org_code:formValues.org_code
 }

 console.log(orgData);
 
 this.orgService.postReturn(`${environment.apiUrl}/api/v1/admin/createOrganization`, orgData).subscribe((resp:any)=>{
   console.log("Organization Created Successfully",resp);
     this.orgSuccess=true;
     window.alert("Organization Created Successfully !")
     this.orgForm.reset();
     console.log(resp.response);   
     },(error=>{
      console.error(error);
      
     }))
  
  this.submit=false;
}
}
