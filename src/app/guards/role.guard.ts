import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  user: User;

  constructor(private localStorageService: LocalStorageService,
    private userService: UserService,
    private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = route.data.expectedRole;
    const token = this.localStorageService.get("user")["role"];

    if (
      this.userService.isAuthenticated() &&
      token === expectedRole
    ) {
      return true;
    }
    this.router.navigate(['../customers']);
    return false;
  }

}
