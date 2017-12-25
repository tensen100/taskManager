import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/observable';

export interface DragData {
  tag: string;
  data: any;
}

@Injectable()
export class DragDropService {
  //  记住上一次的值
  private _dragData = new BehaviorSubject<DragData>(null);
  constructor() { }

  setDragData(data: DragData) {
    this._dragData.next(data);
  }

  getDragData(): Observable<DragData> {
    return this._dragData.asObservable();
  }

  clearDragData() {
    this._dragData.next(null);
  }

}
