import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private Subject = new Subject<string>()
  private behaviourSubject = new BehaviorSubject<string>('behaviourSubject Value');
  data$ = this.Subject.asObservable();
  behaviourSubjectdata$ = this.behaviourSubject.asObservable();

  private MainData = new Subject<any>()
  mainData$ = this.MainData
  forwardData(data: any) {
    this.Subject.next(data);
    this.behaviourSubject.next(data);

    // this.MainData.next(data)
    // this.Subject.next(data+'EXTENTION');
  }
}
