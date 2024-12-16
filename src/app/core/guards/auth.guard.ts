import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { IApiResponseUser, IValidationError } from '../models/IApiResponse';
import { isReactive } from '@angular/core/primitives/signals';

export const authGuard: CanActivateFn = (route, state) => {
  const authService:AuthService= inject(AuthService);
  const router: Router = inject(Router);



  const isLoggedIn$: Observable<IApiResponseUser> = authService.isLoggedIn()

  return isLoggedIn$.pipe(
    map((res:IApiResponseUser) => {
      if (res.success) {
        return true
      }
      router.navigate(['/auth/login'])
      return false
    }),
    catchError((err) => {
      console.error('Guard Error:', err);
      router.navigate(['/auth/login']);
      return of(false);
    })
 )

};
