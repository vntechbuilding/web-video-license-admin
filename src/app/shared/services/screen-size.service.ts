import { Injectable, NgZone } from '@angular/core';
import { fromEvent, ReplaySubject, sampleTime, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  screenWidth!: number;
  screenHeight!: number;
  width$ = new ReplaySubject<number>(1);
  height$ = new ReplaySubject<number>(1);
  screen$ = new Subject<{
    width: number;
    height: number;
  }>();

  constructor(private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(sampleTime(500))
        .subscribe((event) => {
          this.getScreenSize();
        });
    });
    this.getScreenSize();
  }
  getScreenSize() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.width$.next(this.screenWidth);
    this.height$.next(this.screenHeight);
    this.screen$.next({ width: this.screenWidth, height: this.screenHeight });
  }
}
