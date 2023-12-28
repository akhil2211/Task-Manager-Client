import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  let isLoggedIn=null;
  if( typeof localStorage!=="undefined"){
    isLoggedIn=localStorage.getItem("token");
  }
  if(!isLoggedIn){
    console.log(isLoggedIn);
    
   const router=inject(Router);
   return router.navigate(["/login"]);

  }
  else{
    return  true;
  }
};
