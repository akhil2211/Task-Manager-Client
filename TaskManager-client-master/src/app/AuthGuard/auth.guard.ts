import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
 
export const authGuard: CanActivateFn = (route, state) => {
  if(typeof localStorage !== 'undefined' && localStorage.getItem("token") && localStorage.getItem("user")){
    const token = localStorage.getItem("token")
    const expiry = (JSON.parse(atob(token!.split('.')[1]))).exp;
    
    if((Math.floor((new Date).getTime() / 1000)) >= expiry){
      window.alert("Token Expired! Please login again.")

      localStorage.clear()
      return redirectToLogin()
    }else{
      return true;
    }
  }else{
    return redirectToLogin()
  }
};
 
const redirectToLogin = () => {
  const router = inject(Router);
  return router.navigate(['login']);
};