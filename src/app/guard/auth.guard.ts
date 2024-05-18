import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service'
import { Observable } from 'rxjs';

// import { AccountService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private auth: ApiserviceService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       let userLoggedIn = this.auth.checkLogin();
        if (userLoggedIn) {
          return true;
        }
        else {
          this.router.navigate(['/']);
        }
        return false;
    }

}