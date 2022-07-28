import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { MazeService } from 'src/app/services/maze.service';
import {
  MazeGenerationAlgorithm,
  SolvingAlgorithm,
  Speed,
} from 'src/app/store/form';
import { MazeAction } from 'src/app/store/maze/maze.action';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebar') sidebar: ElementRef<HTMLElement>;

  iterableSolvingAlgorithm: string[] = Object.values(SolvingAlgorithm);
  iterableMazeGenerationAlgorithm: string[] = Object.values(
    MazeGenerationAlgorithm
  );
  iterableSpeed: string[] = Object.values(Speed);

  speed: typeof Speed = Speed;
  solvingAlgorithm: typeof SolvingAlgorithm = SolvingAlgorithm;
  mazeGenerationAlgorithm: typeof MazeGenerationAlgorithm =
    MazeGenerationAlgorithm;

  constructor(private store: Store, private mazeService : MazeService) {}

  ngAfterViewInit(): void {
    this.store.dispatch(
      MazeAction.setMazePixel({
        width: window.innerWidth - this.sidebar.nativeElement.clientWidth,
        height: window.innerHeight,
      })
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.store.dispatch(
      MazeAction.setMazePixel({
        width: window.innerWidth - this.sidebar.nativeElement.clientWidth,
        height: window.innerHeight,
      })
    );
  }

  clearWall() : void {
    this.store.dispatch(MazeAction.setMazeIsProcessing({isProcessing : false}));
    this.store.dispatch(MazeAction.setMazeIsWallsSet({isWallsSet: false}));
  }

  ngOnInit(): void {}

  start() {
    this.store.dispatch(MazeAction.setMazeIsProcessing({isProcessing : true}));

    this.mazeService.randomizedPrims();
  }
}
