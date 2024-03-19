import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { Mixin } from 'ts-mixer';
import { AutoUnsubscribe } from '../../../shared/decorators/auto-unsubscribe';
import { GoLoginApiService } from '../go-login-api.service';
import {
  BehaviorSubject,
  filter,
  map,
  ReplaySubject,
  Subscription,
  withLatestFrom,
} from 'rxjs';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-go-login-profiles-zip',
  standalone: true,
  imports: [
    CommonModule,
    NzGridModule,
    NzPopconfirmModule,
    NzToolTipModule,
    NzButtonModule,
    NzIconModule,
    NzPaginationModule,
    NzUploadModule,
  ],
  templateUrl: './go-login-profiles-zip.component.html',
  styleUrl: './go-login-profiles-zip.component.scss',
})
@AutoUnsubscribe()
export class GoLoginProfilesZipComponent
  extends Mixin(ModalContentBase)
  implements OnInit, OnDestroy
{
  constructor(
    private goLoginApiService: GoLoginApiService,
    private notification: NotificationService
  ) {
    super();
  }

  ngOnInit() {
    this.isUpload$.next(false);
    this.uploadSubscription$ = this.fileChange$
      .pipe(withLatestFrom(this.isUpload$))
      .pipe(map(([listFile, isUpload]) => isUpload))
      .pipe(
        filter((isUpload) => {
          return isUpload === false && this._fileList.length > 0;
        })
      )
      .subscribe(() => {
        this.isUpload$.next(true);
        this.doUpload();
      });
  }

  doUpload() {
    let totalUpload = this.fileList.length;
    this.fileList.forEach((file) => {
      this.goLoginApiService.uploadProfileZip(file as any).subscribe((data) => {
        this.notification.success(
          'Tải file thành công',
          'File zip đã được tải lên Server thành công'
        );
        this.fileList = this.fileList.filter((f) => f.uid !== file.uid);
        totalUpload--;
        if (totalUpload === 0) {
          this.isUpload$.next(false);
          this.fileChange$.next(true);
          this.destroyModal({});
        }
      });
    });
  }

  uploadSubscription$!: Subscription;
  ngOnDestroy() {}

  _fileList: NzUploadFile[] = [];
  fileChange$ = new BehaviorSubject(false);
  isUpload$ = new ReplaySubject<boolean>(1);
  set fileList(value: NzUploadFile[]) {
    this._fileList = value;
    this.fileChange$.next(true);
  }
  get fileList() {
    return this._fileList;
  }
  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };
}
