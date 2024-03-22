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
import { ReplaySubject, Subscription, switchMap } from 'rxjs';
import { AuthorService } from '../../../pages/author/author.service';

@Component({
  selector: 'app-author-input-by-user',
  standalone: true,
  imports: [
    NzFormModule,
    NzSelectModule,
    NzGridModule,
    ReactiveFormsModule,
    NzInputModule,
    CommonModule,
  ],
  templateUrl: './author-input-by-user.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorInputByUserComponent),
      multi: true,
    },
  ],
  styleUrl: './author-input-by-user.component.scss',
})
export class AuthorInputByUserComponent
  extends InputComponentBase
  implements OnInit, OnDestroy
{
  constructor(private authorService: AuthorService) {
    super();
  }

  loadData$ = new ReplaySubject<string>();
  author$ = this.loadData$.pipe(
    switchMap((userId) => {
      if (!userId) return [];
      return this.authorService.getAllUserAuthor(userId);
    })
  );
  @Output('authorId') authorId = new EventEmitter<string>();
  @Input('allowClear') allowClear: boolean = false;
  authorIdSubscription!: Subscription;
  userIdSubscription!: Subscription;
  ngOnInit() {
    this.addControl(
      'authorId',
      this.validators['authorId'],
      this.defaultValue['authorId']
    );
    this.authorIdSubscription = this.formGroup
      .get('authorId')
      ?.valueChanges.subscribe((value) =>
        this.authorId.emit(value)
      ) as Subscription;
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
    if (this.authorIdSubscription) this.authorIdSubscription.unsubscribe();
    if (this.userIdSubscription) this.userIdSubscription.unsubscribe();
  }
}
