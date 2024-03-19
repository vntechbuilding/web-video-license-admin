import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';

export abstract class PaginationBase<T> {
  pageSize: number = 10;
  pageIndex: number = 0;
  total: number = 0;
  public loadDataSubject$ = new BehaviorSubject(true);
  public loadData$ = this.loadDataSubject$.asObservable().pipe(shareReplay(1));
  createObservableData(
    loadFunction: (perPage: number, page: number) => Observable<T>
  ): Observable<T> {
    return this.loadData$
      .pipe(switchMap(() => loadFunction(this.pageSize, this.pageIndex)))
      .pipe(
        tap((data: any) => {
          if (data.count) {
            this.total = data.count;
          }
        })
      );
  }
  changePage($event: number) {
    this.pageIndex = $event - 1;
    this.loadDataSubject$.next(true);
  }
}
