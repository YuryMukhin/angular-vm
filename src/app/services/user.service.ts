import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap, debounceTime, switchMap, delay } from 'rxjs/operators';

import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';
import { SortDirection } from './sort.directive';


interface SearchResult {
  users: User[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(users: User[], column: string, direction: string): User[] {
  if (direction === '') {
    return users;
  } else {
    return [...users].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(users: User, term: string, pipe: PipeTransform) {
  return users.firstName.toLowerCase().includes(term)
    || pipe.transform(users.age).includes(term)
    || users.lastName.toLowerCase().includes(term)
    || users.city.toLowerCase().includes(term)
    || users.login.toLowerCase().includes(term);
}


@Injectable({
  providedIn: 'root',
})
export class UserService {
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _users$ = new BehaviorSubject<User[]>([]);
    private _total$ = new BehaviorSubject<number>(0);
  
    private _state: State = {
      page: 1,
      pageSize: 4,
      searchTerm: '',
      sortColumn: '',
      sortDirection: ''
    };

  
  user: User;
  logedUser: User;
  users: User[];
  token = false;

  constructor(private localStorageService: LocalStorageService,
    public pipe: DecimalPipe){
      this._search$.pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      ).subscribe(result => {
        this._users$.next(result.users);
        this._total$.next(result.total);
      });
  
      this._search$.next();
    }

    get users$() { return this._users$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
  
    set page(page: number) { this._set({page}); }
    set pageSize(pageSize: number) { this._set({pageSize}); }
    set searchTerm(searchTerm: string) { this._set({searchTerm}); }
    set sortColumn(sortColumn: string) { this._set({sortColumn}); }
    set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }
  
    private _set(patch: Partial<State>) {
      Object.assign(this._state, patch);
      this._search$.next();
    }
  
    private _search(): Observable<SearchResult> {
      const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
  
      // 1. sort
      let users = sort(this.getAll(), sortColumn, sortDirection);
  
      // 2. filter
      users = users.filter(user => matches(user, searchTerm, this.pipe));
      const total = users.length;
  
      // 3. paginate
      users = users.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      return of({users, total});
    }


  login(username: string, password: string): any { 
    this.users = this.localStorageService.get('users');
    if(this.users){
      this.users.forEach(element => {
        if(element['login']==username || element['password']==password){
          this.logedUser = element;
          this.localStorageService.set("state", "true");
          this.localStorageService.set("user", this.logedUser);
        }
      });
    }
    if(!this.logedUser){
      this.localStorageService.set("state", "false");
    }
    return this.logedUser;
  }

  register(curUser: User): any {
    this.users = this.localStorageService.get('users');
    if(this.users){
      this.users.forEach(element => {
        if(element['login']==curUser.login || element['password']==curUser.password){
          console.log('bad boy');
          return null;
        }
      });
    } else {
      this.users = [];
    }

    curUser.id = Math.floor(Math.random() * Math.floor(100));

    this.users.push(curUser);
    this.localStorageService.set('users', this.users);
    return curUser;
  }

  getAll() {
    return this.localStorageService.get('users');
  }

  getCurrentUser(): User {
    return this.localStorageService.get("user");
  }

  isAuthenticated() {
    this.token = this.localStorageService.get("state") == "true";
    return this.token;
  }

  createAdmin() {
    this.localStorageService.set('users', [{"firstName":"Yury","lastName":"Kitin","role":"1","age":27,"city":"Minsk","login":"yury","password":"yury","id":81}]);
  }
}