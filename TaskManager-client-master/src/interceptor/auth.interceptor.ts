import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token");
 
  if (token) {
    
    
    if (req.headers.get('ResponseType') === 'text') {
      const authReq = req.clone({
        responseType: 'text',
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
      return next(authReq);
    }else{
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
      return next(authReq);
    }
  }
  return next(req);
};
