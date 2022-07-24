import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FormActions,
  MazeGenerationAlgorithm,
  SolvingAlgorithm,
  Speed,
} from 'src/app/store/form';
import { FormSelector } from 'src/app/store/form/form.selector';
import { map } from 'rxjs/operators';
import { Dropdown } from 'src/app/types/dropdown.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss'],
})
export class SingleSelectComponent implements OnInit {
  @Input() label: string;
  @Input() options: string[];
  @Input() enum: Object;

  isOpen: boolean = false;

  activeOption$: Observable<SolvingAlgorithm | MazeGenerationAlgorithm | Speed>;
  activeDropdown$ = this.store.select(FormSelector.selectActiveDropdown);

  constructor(private store: Store) {}

  openDropdown(): void {
    if (this.isOpen) {
      this.store.dispatch(FormActions.closeDropdown());
      this.isOpen = false;
    } else {
      this.isOpen = true;
      this.store.dispatch(FormActions.openDropdown({ label: this.label }));
    }
  }

  setActiveItem(enumValue: string) {
    // const key = Object.keys(this.enum)[
    //   Object.values(this.enum).indexOf(enumValue)
    // ];

    switch (this.enum) {
      case SolvingAlgorithm:
        this.store.dispatch(
          FormActions.setSolvingAlgorithm({
            solvingAlgorithm: enumValue as SolvingAlgorithm,
          })
        );
        break;
      case Speed:
        this.store.dispatch(
          FormActions.setSpeed({ speed: enumValue as Speed })
        );
        break;
      case MazeGenerationAlgorithm:
        this.store.dispatch(
          FormActions.setMazeGenerationAlgorithm({
            mazeGenerationAlgorithm: enumValue as MazeGenerationAlgorithm,
          })
        );
        break;
    }

    this.store.dispatch(FormActions.closeDropdown());
  }

  setActiveOption(enumeration: Object) {
    switch (enumeration) {
      case SolvingAlgorithm:
        this.activeOption$ = this.store.select(
          FormSelector.selectSolvingAlgorithm
        );
        break;
      case Speed:
        this.activeOption$ = this.store.select(FormSelector.selectSpeed);
        break;
      case MazeGenerationAlgorithm:
        this.activeOption$ = this.store.select(
          FormSelector.selectMazeGeneration
        );
        break;
    }
  }

  ngOnInit(): void {
    this.setActiveOption(this.enum);
  }
}
