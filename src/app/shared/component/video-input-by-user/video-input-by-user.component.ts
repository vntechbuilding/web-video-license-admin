import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { InputComponentBase } from '../../base/input-component.base';
import { ReplaySubject, Subscription, switchMap, tap } from 'rxjs';
import {
  video,
  videoResponse,
  VideoService,
} from '../../../pages/video/video.service';
import { environment } from '../../../../environments/environment';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ClipboardModule, IClipboardResponse } from 'ngx-clipboard';

@Component({
  selector: 'app-video-input-by-user',
  standalone: true,
  imports: [
    NzFormModule,
    NzSelectModule,
    NzGridModule,
    ReactiveFormsModule,
    NzInputModule,
    CommonModule,
    NzButtonModule,
    ClipboardModule,
  ],
  templateUrl: './video-input-by-user.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VideoInputByUserComponent),
      multi: true,
    },
  ],
  styleUrl: './video-input-by-user.component.scss',
})
export class VideoInputByUserComponent
  extends InputComponentBase
  implements OnInit, OnDestroy
{
  constructor(private videoService: VideoService) {
    super();
  }

  loadData$ = new ReplaySubject<string>();
  videoUploadPath = environment.videoUploadPath;
  videoData!: videoResponse;
  videoSelected!: video;
  video$ = this.loadData$.pipe(
    switchMap((userId) => {
      if (!userId) return [];
      return this.videoService.getAllUserVideo(userId, 99999);
    }),
    tap((value) => {
      this.videoData = value;
      const videoId = this.formGroup.get('videoId')?.value;
      if (videoId) {
        this.videoSelected = this.videoData?.data?.find(
          (video) => video.id === videoId
        ) as video;
      }
    })
  );
  isCopy: boolean = false;
  copied($event: IClipboardResponse) {
    this.isCopy = true;
    setTimeout(() => {
      this.isCopy = false;
    }, 4000);
  }
  @Output('videoId') videoId = new EventEmitter<string>();
  @Input('allowClear') allowClear: boolean = false;
  videoIdSubscription!: Subscription;
  userIdSubscription!: Subscription;
  ngOnInit() {
    this.addControl(
      'videoId',
      this.validators['videoId'],
      this.defaultValue['videoId']
    );
    this.videoIdSubscription = this.formGroup
      .get('videoId')
      ?.valueChanges.subscribe((value) => {
        this.videoId.emit(value);
        this.videoSelected = this.videoData?.data?.find(
          (video) => video.id === value
        ) as video;
      }) as Subscription;
    this.userIdSubscription = this.formGroup
      .get('userId')
      ?.valueChanges.subscribe((value) => {
        this.loadData$.next(value);
      }) as Subscription;
    if (this.defaultValue['userId']) {
      this.loadData$.next(this.defaultValue['userId']);
    }
  }
  ngOnDestroy() {
    if (this.videoIdSubscription) this.videoIdSubscription.unsubscribe();
    if (this.userIdSubscription) this.userIdSubscription.unsubscribe();
  }
}
