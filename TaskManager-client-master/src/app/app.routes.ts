import { Router, Routes } from '@angular/router';
import path from 'path';
import { LoginComponent } from './Pages/login/login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { authGuard } from './AuthGuard/auth.guard';
import { ProfileComponent } from './Pages/profile/profile.component';
import { inject } from '@angular/core';

export const routes: Routes = [
    {
        path:"dashboard",
        component:DashboardComponent,
        title:"Your Dashboard",
        canActivate:[authGuard]
    },
    {
        path:"login",
        component:LoginComponent,
        title:"Login to Task Manager",canActivate:[()=>{
            if(typeof localStorage !== 'undefined' && localStorage.getItem("token") && localStorage.getItem("user")){
                const router = inject(Router)
                return router.navigate(['dashboard']);
            }else{
                return true;
            }
        }]}     
    ,

    {
        path:"profile",
        component:ProfileComponent,
        title:"Profile"
    },

    {
        path:"",
        redirectTo:"login",pathMatch: 'full'
    },  
    
];
