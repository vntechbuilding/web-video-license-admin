import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();
  private loadingCount = 0;

  constructor() {}

  show() {
    this.loadingCount++;
    this._loading.next(true);
  }

  hide() {
    // this._loading.next(false);
    this.loadingCount--;
    if (this.loadingCount <= 0) {
      this._loading.next(false);
    }
  }

  showLoading() {
    return <T>(source: Observable<T>): Observable<T> => {
      const ___this = this;
      return new Observable((observer) => {
        // Hiển thị loading
        this.show();

        const subscription = source.subscribe({
          next(value) {
            observer.next(value);
          },
          error(err) {
            // Ẩn loading khi xảy ra lỗi
            ___this.hide();
            observer.error(err);
          },
          complete() {
            // Ẩn loading khi hoàn thành
            ___this.hide();
            observer.complete();
          },
        });

        // Trả về hàm dọn dẹp
        return () => {
          subscription.unsubscribe();
          ___this.hide();
        };
      });
    };
  }
}
