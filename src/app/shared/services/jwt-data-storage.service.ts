import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  ReplaySubject,
  catchError,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthApiService } from './auth-api.service';
export declare type authUserData = {
  accessToken: string;
  refreshToken: string;
  token: string;
  username: string;
  userId: string;
  // fullName: string;
  // balance: number;
};
export declare type tokenFormat = {
  tokenId: string;
  userId: string;
};
@Injectable({
  providedIn: 'root',
})
export class JwtDataStorageService {
  public token$: BehaviorSubject<string | null | boolean> = new BehaviorSubject<
    string | null | boolean
  >(null);
  public tokenId: string | null = null;
  public memberId: string | null = null;
  public userData: authUserData | null = null;
  public userData$ = new ReplaySubject<authUserData | null>(1);
  constructor(
    private auth: AuthApiService,
    private localSt: LocalStorageService
  ) {
    // console.log('JwtDataStorageService');
    // this.loadToken().subscribe();
    // console.log(this.platform.platforms());
  }

  /*
  Lấy local token và get token mới
  trả về true nếu thành công, ngược lại false
   */
  loadToken() {
    return of(this.getLocalUserData()).pipe(
      switchMap((userData) => {
        // console.log(token);
        if (userData && userData.accessToken) {
          return this.auth
            .resetToken(userData.refreshToken, userData.token)
            .pipe(
              tap((tokenData) => {
                this.setToken(tokenData);
              }),
              catchError((_) => {
                this.removeToken();
                return of(false);
              })
            );
        } else {
          this.removeToken();
          return of(false);
        }
      })
    );
  }

  private getLocalUserData(): authUserData | null {
    return this.localSt.retrieve('adminData');
  }

  private removeLocalUserData() {
    this.localSt.clear('adminData');
  }

  private setLocalUserData(userData: authUserData) {
    this.localSt.store('adminData', userData);
  }
  public removeToken() {
    this.token$.next('');
    this.userData$.next(null);
    this.userData = null;
    this.tokenId = '';
    this.memberId = '';
    this.removeLocalUserData();
  }

  public setToken(tokenData: authUserData) {
    this.tokenId = tokenData.token;
    this.memberId = tokenData.userId;
    this.token$.next(tokenData.accessToken);
    this.userData = tokenData;
    this.userData$.next(tokenData);
    this.setLocalUserData(tokenData);
  }

  public getLocalAccessToken() {
    const userData = this.getLocalUserData();
    return userData ? userData.accessToken : null;
  }

  public getLocalRefreshToken() {
    const userData = this.getLocalUserData();
    return userData ? userData.refreshToken : null;
  }

  /**
   * Kiểm tra xem token đang sử dụng có phải token được lưu ở Local không
   * VD Nếu đang sử dụng web thì ở tab khác đã cập nhật token mà tab này đang treo lâu dài chưa cập nhật theo
   * return true nếu token lưu ở local khác với token đang sử dụng
   */
  public checkLocalAccessToken() {
    return of(this.getLocalUserData()).pipe(
      map((userData) => {
        // console.log('checkLocalAccessToken', localAccessToken, accessToken);
        if (
          userData &&
          userData.accessToken &&
          userData.accessToken !== this.token$.value
        ) {
          this.tokenId = userData.token;
          this.memberId = userData.userId;

          this.token$.next(userData.accessToken);
          return true;
        }
        return false;
      })
    );
  }
}
