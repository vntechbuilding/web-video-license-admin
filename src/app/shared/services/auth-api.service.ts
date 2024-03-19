import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
// import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { authUserData } from './jwt-data-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpClient, private router: Router) {
    // console.log("Auth Service");
    // this.isCheckLocal$.SUBSCRIBE(data=>console.log(data))
  }

  loginUrl(returnUrl?: string) {
    return this.router.navigate(['/auth', 'login'], {
      queryParams: { retUrl: returnUrl },
    });
  }

  isCheckLocal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //
  // __CheckUserData(register: boolean = true) {
  //   const userData: authUserData = this.localSt.retrieve('userData');
  //   if (userData && userData.refreshToken) {
  //     this.resetToken(userData.refreshToken, userData.token).subscribe(
  //       (data: authUserData) => {
  //         if (data && data.accessToken) {
  //           this.authService.login(userData.accessToken, data);
  //         } else {
  //           this.logout();
  //         }
  //         this.isCheckLocal$.next(true);
  //         if (register) this.__RegisterUserData();
  //       },
  //       (err) => {
  //         this.isCheckLocal$.next(true);
  //         this.logout();
  //         if (register) this.__RegisterUserData();
  //       }
  //     );
  //   } else {
  //     this.isCheckLocal$.next(true);
  //     if (register) this.__RegisterUserData();
  //   }
  // }
  //
  // __RegisterUserData() {
  //   this.authService.userData$
  //     .pipe(withLatestFrom(this.authService.isLogged$))
  //     .subscribe(([userData, isLogged]) => {
  //       if (isLogged) {
  //         this.localSt.store('userData', userData);
  //       } else {
  //         this.localSt.clear('userData');
  //       }
  //     });
  // }
  //
  // logout() {
  //   this.authService.logout();
  //   this.localSt.clear('userData');
  // }

  resetToken(refreshToken: string, token: string) {
    return this.http.get<authUserData>(environment.apiUrl + 'auth', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        token: token,
      },
    });
  }

  loginRequest(username: string, password: string) {
    return this.http
      .post<authUserData>(environment.apiUrl + 'auth', {
        username: username,
        password: password,
      })
      .pipe(
        map((userData) => {
          // console.log(userData);
          // if (userData && userData.accessToken) {
          //   this.authService.login(userData.accessToken, userData);
          // } else {
          //   return false;
          // }
          return userData;
        })
        // catchError((error)=>{
        //   console.log(error)
        //   throw new Error(error);
        // }),
      );
  }
}
