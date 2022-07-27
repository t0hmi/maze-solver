import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CellProcessorService {

  private processedCell : Subject<string> = new ReplaySubject(1);

  processedCell$ = this.processedCell.asObservable();

  addNewProcessedCell(key : string) : void {
    this.processedCell.next(key);
  }

  testEmit() {
  }

  constructor() { 
  }
}
