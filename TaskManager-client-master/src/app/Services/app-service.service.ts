import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
 
  constructor(private httpCient : HttpClient) { }

  postReturn(apiUrl : string, requestBody:any| null, options?: any){
    return this.httpCient.post(apiUrl,requestBody,options)
  }
  getReturn(apiUrl : string, options?: any){
    return this.httpCient.get(apiUrl,options)
  }
  
  deleteReturn(apiUrl : string, options?: any){
    return this.httpCient.delete(apiUrl,options)
  }
}
