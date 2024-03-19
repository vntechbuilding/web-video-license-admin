import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notification: NzNotificationService) {}

  httpError(error: HttpErrorResponse, send: boolean = true) {
    // console.log(error)
    let errorMsg: string = '';
    let mgs: string = '';
    // console.log(error)
    if (error && error.error && error.error.message) {
      //error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
      mgs = error.error.message;
    } else if (error.message) {
      errorMsg = `Error: ${error.message}`;
      mgs = error.message;
    } else {
      errorMsg = mgs = 'Something bad happened; please try again later.';
    }
    if (send)
      if (error.status === 0) {
        this.notification.error('An error occurred', errorMsg);
      } else {
        this.notification.error(
          `Backend returned code ${error.status}, body was: `,
          errorMsg
        );
      }
    return mgs || 'Lỗi không xác định';
  }

  error(title: string, content: string) {
    this.notification.create('error', title, content);
  }

  userPasswordError() {
    this.notification.create(
      'error',
      'Mật khẩu không chính xác',
      'Vui lòng nhập mật khẩu tài khoản đang đăng nhập'
    );
  }

  unknownError() {
    this.notification.create(
      'error',
      'Lỗi không xác định',
      'Vui lòng thử lại sau'
    );
  }

  success(title: string, content: string, duration = 5000) {
    this.notification.create('success', title, content, {
      nzDuration: duration,
    });
  }

  info(title: string, content: string, duration = 5000) {
    this.notification.create('info', title, content, {
      nzDuration: duration,
    });
  }

  warning(title: string, content: string, duration = 5000) {
    this.notification.create('warning', title, content, {
      nzDuration: duration,
    });
  }
}
