import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Vacation } from '../models/vacation';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class VacationService {
  private _vacations$ = new BehaviorSubject<Vacation[]>([]);

  user: User;
  vacations: Vacation[];

  constructor(private localStorageService: LocalStorageService) {
    this._vacations$.next(this.getAll());
  }

  requestVacation(vc: Vacation) {
    const edit = this.localStorageService.get('edit');
    this.user = this.localStorageService.get('user');
    this.vacations = this.getAll();
    if (edit && edit.state) {
      this.vacations.forEach(vacation =>{
        if(vacation.from == edit.vacation.from && vacation.type == edit.vacation.type && vacation.to == edit.vacation.to) {
          vacation.from = vc.from;
          vacation.to = vc.to;
          vacation.type = vc.type;
        }
      });
      this.localStorageService.set("edit", {});
    } else {
      if (this.user) {
        vc["iduser"] = this.user.id;
        vc["employee"] = this.user.firstName + ' ' + this.user.lastName;
      }
      if (!this.vacations) {
        this.vacations = [];
      }

      this.vacations.push(vc);
    }
    this.localStorageService.set('vacations', this.vacations);
    this._vacations$.next(this.getAll());
    
    return vc;
  }

  getAll() {
    return this.localStorageService.get('vacations');
  }

  get vacations$() { return this._vacations$.asObservable(); }
}
