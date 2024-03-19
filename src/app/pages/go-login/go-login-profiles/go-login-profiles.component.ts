import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { Mixin } from 'ts-mixer';
import { PaginationBase } from '../../../shared/base/pagination-base';
import {
  goLoginAPIGetAllProfiles,
  GoLoginApiService,
} from '../go-login-api.service';
import { ModalBase } from '../../../shared/base/modal-base';
import { Observable, switchMap, tap } from 'rxjs';
import { GoLoginProfilesZipComponent } from '../go-login-profiles-zip/go-login-profiles-zip.component';

@Component({
  selector: 'app-go-login-profiles',
  standalone: true,
  imports: [
    NzTableModule,
    NzButtonModule,
    CommonModule,
    NzSwitchModule,
    FormsModule,
    NzIconModule,
    NzToolTipModule,
    NzPopconfirmModule,
  ],
  templateUrl: './go-login-profiles.component.html',
  styleUrl: './go-login-profiles.component.scss',
})
export class GoLoginProfilesComponent extends Mixin(
  PaginationBase<goLoginAPIGetAllProfiles>,
  ModalBase
) {
  constructor(private goLoginApiService: GoLoginApiService) {
    super();
  }
  override pageSize = 20;
  public goLoginProfiles$ = this.createObservableData((perPage, page) =>
    this.goLoginApiService.getProfiles(perPage, page)
  );

  public goLoginProfileInFolder$: Observable<number> = this.loadData$.pipe(
    switchMap(() => this.goLoginApiService.countProfileInFolder())
  );
  //
  //
  // create() {
  //   const modal = this.createComponentModal({
  //     nzTitle: 'Tạo API KEY',
  //   }, GoLoginApiCreateComponent);
  //   modal.afterClose.subscribe(data=>{
  //     console.log(data)
  //     if(data && data.API_KEY) this.loadDataSubject$.next(true)
  //   })
  // }
  import() {
    return this.goLoginApiService
      .importProfileFolder()
      .pipe(tap((_) => this.loadDataSubject$.next(true)))
      .subscribe();
  }

  upload() {
    const modal = this.createComponentModal(
      {
        nzTitle: 'Upload Zip Profile',
      },
      GoLoginProfilesZipComponent
    );
    modal.afterClose.subscribe((data) => {
      this.loadDataSubject$.next(true);
    });
  }
}
