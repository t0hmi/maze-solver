import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Settings } from 'src/app/common/settings';
import { MazeService } from 'src/app/services/maze.service';
import { MazeSelector } from 'src/app/store/maze/maze.selector';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss'],
})
export class MazeComponent implements OnInit, AfterViewInit {
  // numbers of cells : totalwith / cellWidth

  isReady = false;
  mazeWidth$ = this.store.select(MazeSelector.selectMazeWidth);
  mazeHeight$ = this.store.select(MazeSelector.selectMazeHeight);

  x: number;
  y: number;


  rows : number[]
  columns : number[]


  cellWidth = Settings.cellWidth;

  constructor(private store: Store, private mazeService : MazeService) {}

  ngAfterViewInit(): void {
    combineLatest([this.mazeWidth$, this.mazeHeight$])
      .pipe(
        map(([width, height]) => {
          return { width, height };
        })
      )
      .subscribe((output) => {
        this.x = Math.round((output.width - 150) / Settings.cellWidth);
        this.y = Math.round((output.height - 100) / Settings.cellWidth);
        
        this.rows = Array(this.y).fill(0).map((x,i)=>i);
        this.columns = Array(this.x).fill(0).map((x,i)=>i);

        this.isReady = this.mazeService.initializeMaze(this.x, this.y);
      });
  }

  toggleWall(x,y) {
    if(!this.mazeService.isWall(x,y)) {
      this.mazeService.addWall(x,y);
    }
  }

  ngOnInit(): void {}
}
