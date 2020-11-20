import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user';
import { NgbdSortableHeader, SortEvent } from 'src/app/services/sort.directive';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  providers: [UserService, DecimalPipe]
})
export class ListViewComponent implements OnInit {
  count = 0;

  rows = ["firstName", "lastName", "age", "city", "login"];

  users: User[];

  ngOnInit(): void {

    this.users = this.service.getAll();
  }

  users$: Observable<User[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: UserService) {
    this.users$ = service.users$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}