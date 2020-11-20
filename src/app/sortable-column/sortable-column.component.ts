import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SortService } from '../services/sort.service';

@Component({
  selector: 'app-sortable-column',
  templateUrl: './sortable-column.component.html',
  styleUrls: ['./sortable-column.component.scss']
})
export class SortableColumnComponent implements OnInit, OnDestroy {

  @Input('sortable-column')
  columnName: string;

  @Input('sort-direction')
  sortDirection: string = '';

  private columnSortedSubscription: Subscription;

  @HostListener('click')
  sort() {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      this.sortService.columnSorted({ sortColumn: this.columnName, sortDirection: this.sortDirection });
  }

  constructor(private sortService: SortService) { }

  ngOnInit(): void {
    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
      if (this.columnName != event.sortColumn) {
          this.sortDirection = '';
      }
  });
  }

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }

}
