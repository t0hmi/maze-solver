import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CellProcessorService {

  private processedCell : Subject<string> = new ReplaySubject(1);
  private wallCell : Subject<string> = new ReplaySubject(1);
  private blankCell : Subject<string> = new ReplaySubject(1);

  wallCell$ = this.wallCell.asObservable();
  processedCell$ = this.processedCell.asObservable();
  blankCell$ = this.blankCell.asObservable();

  addNewProcessedCell(key : string) : void {
    this.processedCell.next(key);
  }

  addWallCell(key : string) : void {
    this.wallCell.next(key);
  }

  addBlankCell(key : string) : void {
    this.blankCell.next(key);
  }

  constructor() { 
  }
}
