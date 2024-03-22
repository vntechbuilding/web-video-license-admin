import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  from,
  map,
  Observable,
  of,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { JwtDataStorageService } from '../services/jwt-data-storage.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from './auth-api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoadingService } from './loading.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<null | boolean> = new BehaviorSubject<
    null | boolean
  >(null);
  constructor(
    private jwtData: JwtDataStorageService,
    private auth: AuthApiService,
    private router: Router,
    private notificationService: NzNotificationService,
    private loadingService: LoadingService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isInBlockedList(req.url)) {
      return this.addAccessToken(req).pipe(
        switchMap((httpRequest) => {
          return next
            .handle(httpRequest)
            .pipe(this.catchLocalAccessToken(req, next));
        }),
        this.loadingService.showLoading()
      );
    } else return next.handle(req).pipe(this.loadingService.showLoading()); //.pipe(this.catchLocalAccessToken(req, next));
  }

  /**
   * Kiểm tra xem local token có cập nhật chưa, nếu chưa thì request lại 1 lần nữa bằng accesstoken mới
   * Nếu cập nhật mới nhất rồi thì dùng refreshtoken lấy token mới
   * @param next
   * @private
   */
  private catchLocalAccessToken(request: HttpRequest<any>, next: HttpHandler) {
    return (source$: Observable<HttpEvent<any>>): Observable<any> => {
      return source$.pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 401) {
            return this.jwtData.checkLocalAccessToken().pipe(
              switchMap((localToken) => {
                // console.log('localToken', localToken);
                if (localToken) {
                  return this.addAccessToken(request).pipe(
                    switchMap((httpRequest) => {
                      return next
                        .handle(httpRequest)
                        .pipe(this.catchLocalAccessToken(request, next));
                    })
                  );
                } else {
                  return this.handleRefreshToken(request, next);
                }
              })
            );
          } else return throwError(() => error);
        })
      );
    };
  }

  private handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    // console.log(this.isRefreshingToken);
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);
      return of(this.jwtData.getLocalRefreshToken()).pipe(
        switchMap((refreshToken) => {
          // console.log('refreshToken', refreshToken);
          if (!refreshToken) return this.tokenExpired();
          return this.auth
            .resetToken(refreshToken, this.jwtData.tokenId as string)
            .pipe(
              switchMap((tokenData) => {
                return of(this.jwtData.setToken(tokenData)).pipe(
                  switchMap((_) => {
                    return this.addAccessToken(request).pipe(
                      switchMap((httpRequest) => {
                        return next
                          .handle(httpRequest)
                          .pipe(this.catchLocalAccessToken(request, next));
                      })
                    );
                  })
                );
              })
            )
            .pipe(catchError((_) => this.tokenExpired()));
        }),
        finalize(() => (this.isRefreshingToken = false))
      );
    } else {
      return this.tokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => {
          if (token) {
            return this.addAccessToken(request).pipe(
              switchMap((httpRequest) => {
                return next.handle(httpRequest);
              })
            );
          } else {
            return this.tokenExpired();
          }
        })
      );
    }
  }

  private tokenExpired() {
    this.isRefreshingToken = false;
    this.notificationService.error(
      'Login session expired',
      'Please log in again'
    );
    return from(this.auth.loginUrl(this.router.url)).pipe(
      map(() => this.jwtData.removeToken())
    );
  }

  private addAccessToken(req: HttpRequest<any>) {
    return this.jwtData.token$.pipe(
      filter((val) => val !== null),
      take(1),
      map((token) => {
        return req.clone({
          setHeaders: {
            Authorization: `${token}`,
            member: this.jwtData.memberId || '',
            token: this.jwtData.tokenId || '',
          },
        });
      })
    );
  }

  private isInBlockedList(url: string) {
    const regex = /\/auth(\/)?$/;
    // console.log(url, url.indexOf('/auth'), url.indexOf('/refresh-token'));
    if (regex.test(url) || url.indexOf('/refresh-token') >= 0) return true;
    return false;
  }
}
