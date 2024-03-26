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
import { Subscription } from 'rxjs';
import { DomainService } from '../../../pages/domain/domain.service';

@Component({
  selector: 'app-domain-id-input',
  standalone: true,
  imports: [
    NzFormModule,
    NzSelectModule,
    NzGridModule,
    ReactiveFormsModule,
    NzInputModule,
    CommonModule,
  ],
  templateUrl: './domain-id-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DomainIdInputComponent),
      multi: true,
    },
  ],
  styleUrl: './domain-id-input.component.scss',
})
export class DomainIdInputComponent
  extends InputComponentBase
  implements OnInit, OnDestroy
{
  constructor(private domainService: DomainService) {
    super();
  }

  domain$ = this.domainService.allDomains(9999, 0);
  @Output('domainId') domainId = new EventEmitter<string>();
  @Input('allowClear') allowClear: boolean = false;
  domainIdSubscription!: Subscription;
  ngOnInit() {
    this.addControl('domainId', this.validators['domainId']);
    this.domainIdSubscription = this.formGroup
      .get('domainId')
      ?.valueChanges.subscribe((value) =>
        this.domainId.emit(value)
      ) as Subscription;
  }
  ngOnDestroy() {
    if (this.domainIdSubscription) this.domainIdSubscription.unsubscribe();
  }
}
