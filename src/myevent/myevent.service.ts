import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MyeventService {

  private event = new Subject<any>();

  publish(data: any) {
      this.event.next(data);
  }

  getObservable(): Subject<any> {
      return this.event;
  }
}
