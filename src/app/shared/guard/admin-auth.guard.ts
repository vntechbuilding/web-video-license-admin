import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { filter, map } from 'rxjs';
import { JwtDataStorageService } from '../services/jwt-data-storage.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const jwtDataStorage = inject(JwtDataStorageService);
  const router = inject(Router);
  return jwtDataStorage.token$.pipe(
    filter((value) => value !== null),
    map((accessToken) => {
      if (!accessToken) {
        router
          .navigate(['/auth', 'login'], {
            queryParams: { retUrl: state.url },
          })
          .then();

        return false;
      }
      return true;
    })
  );
};
