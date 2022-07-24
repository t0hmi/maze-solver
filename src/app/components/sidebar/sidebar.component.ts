import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
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

  constructor(private store: Store) {}

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

  ngOnInit(): void {}
}
