import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vacation } from '../models/vacation';
import { LocalStorageService } from '../services/local-storage.service';
import { VacationService } from '../services/vacation.service';

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.scss']
})
export class VacationsComponent implements OnInit {
  rows = ["employee", "from", "to", "type"];
  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [5, 10, 15];
  idUser: number;

  vacations: Vacation[];
  vacations$: Observable<Vacation[]>;
  private _vacations$ = new BehaviorSubject<Vacation[]>([]); 
  vacationRow: Vacation;

  constructor(private vacationService: VacationService,
    private localStorageService: LocalStorageService,
    private activateRoute: ActivatedRoute) {
    
}

  ngOnInit(): void {
    this.vacations$ = this.vacationService.vacations$;
    this.vacations$.subscribe(data => {
      const id = this.activateRoute.snapshot.params.id;
      if (id && data) {
        const filtered = data.filter(v => {
          const res = v.iduser == id;
          return res;
        });
      
        this._vacations$.next(filtered);
        this.vacations$ = this._vacations$.asObservable();
      }
    });
  }

  onTableDataChange(event) {
    this.page = event;
  }

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  edit(row: Vacation) {
    this.vacationRow = row;
    this.localStorageService.set("edit", {state: true, vacation: row});
  }
}
