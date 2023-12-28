import { Routes } from '@angular/router';
import path from 'path';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { authGuard } from './AuthGuard/auth.guard';
import { TaskComponent } from './Pages/Tasks/task/task.component';
import { ProfileComponent } from './Pages/profile/profile.component';

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
        title:"Login to Task Manager"
    },

    {
        path:"profile",
        component:ProfileComponent,
        title:"Profile"
    }

];
