import { Component } from '@angular/core';
import {
  UserDomainFilter,
  UserDomainFilterComponent,
} from '../../../shared/component/user-domain-filter/user-domain-filter.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Mixin } from 'ts-mixer';
import { ModalBase } from '../../../shared/base/modal-base';
import { PaginationBase } from '../../../shared/base/pagination-base';
import { video, videoResponse, VideoService } from '../video.service';
import { VideoCreateComponent } from '../video-create/video-create.component';
import { VideoEditComponent } from '../video-edit/video-edit.component';
import { environment } from '../../../../environments/environment';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-video-index',
  standalone: true,
  imports: [
    UserDomainFilterComponent,
    NzTableModule,
    NzButtonModule,
    CommonModule,
    FormsModule,
    NzPopconfirmModule,
    NzIconModule,
  ],
  templateUrl: './video-index.component.html',
  styleUrl: './video-index.component.scss',
})
export class VideoIndexComponent extends Mixin(
  ModalBase,
  PaginationBase<videoResponse>
) {
  videoUploadPath = environment.videoUploadPath;
  imageUploadPath = environment.uploadMetaImageThumbnailUrl;
  constructor(private videoService: VideoService) {
    super();
  }

  video$ = this.createObservableData((perPage, page) => {
    if (this.filter && this.filter.userId) {
      return this.videoService.getAllUserVideo(
        this.filter.userId,
        perPage,
        page
      );
    }
    return this.videoService.getAllVideo(perPage, page);
  });

  filter!: UserDomainFilter;
  filterData($event: UserDomainFilter) {
    this.filter = $event;
    this.loadDataSubject$.next(true);
  }

  create() {
    this.createComponentModal(
      {
        nzTitle: 'Tạo video',
        nzWidth: '100vw',
      },
      VideoCreateComponent
    ).afterClose.subscribe(() => this.loadDataSubject$.next(true));
  }

  edit(video: video) {
    this.createComponentModal<VideoEditComponent, video>(
      {
        nzTitle: 'Cập nhật video ' + video.name,
        nzWidth: '100vw',
      },
      VideoEditComponent,
      video
    ).afterClose.subscribe(() => this.loadDataSubject$.next(true));
  }

  delete(video: video) {
    this.videoService
      .deleteVideo(video.id)
      .subscribe(() => this.loadDataSubject$.next(true));
  }
}
