import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { IApiResponseUser } from '../models/IApiResponse';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService:AuthService= inject(AuthService);
    const router: Router = inject(Router);



  const isLoggedIn$: Observable<IApiResponseUser> = authService.isLoggedIn()

  return isLoggedIn$.pipe(
    map((res: IApiResponseUser) => {
      if (res.success) {
        router.navigate(['/'])
        return false
      }
      return true
    }),
    catchError((err) => {
      return of(true)
    })
  )


};
