
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private datePipe:DatePipe) { }
  public notify = new BehaviorSubject<any>("");
  notifyObservale$=this.notify.asObservable();

  public notifyOther(data:any){
    if(data){
      this.notify.next(data);
    }
  }

extractDate(timestamp: string): string {
    const date = new Date(timestamp);
    return this.datePipe.transform(date, 'dd/MM/yy') || '';
  }

HHMMFormatter(timestamp:string){
    const inputDate = new Date(timestamp);
    const options:any = { hour: '2-digit', minute: '2-digit' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(inputDate);
  }
}
