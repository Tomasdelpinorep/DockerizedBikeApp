import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable, of } from 'rxjs';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
class PermissionService {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return of(inject(AuthService).isAdmin());
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  return inject(PermissionService).canActivate(next, state);
}