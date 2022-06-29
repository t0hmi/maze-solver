import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormActions } from 'src/app/store/form';
import { FormSelector } from 'src/app/store/form/form.selector';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss'],
})
export class SingleSelectComponent implements OnInit {
  @Input() label: string;
  @Input() options: string[];

  activeDropdown$ = this.store.select(FormSelector.selectActiveDropdown);

  constructor(private store: Store) {}

  openDropdown(): void {
    // this.activeDropdown$.subscribe((activeDropdown) => {
    //   console.log(activeDropdown);
    //   if (activeDropdown === this.label) {
    //     this.store.dispatch(FormActions.closeDropdown());
    //   } else {
    //     this.store.dispatch(FormActions.openDropdown({ label: this.label }));
    //   }
    // });
    console.log(this.activeDropdown$);
  }

  ngOnInit(): void {}
}
