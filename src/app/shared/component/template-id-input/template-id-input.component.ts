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
import { TemplateService } from '../../../pages/template/template.service';

@Component({
  selector: 'app-template-id-input',
  standalone: true,
  imports: [
    NzFormModule,
    NzSelectModule,
    NzGridModule,
    ReactiveFormsModule,
    NzInputModule,
    CommonModule,
  ],
  templateUrl: './template-id-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TemplateIdInputComponent),
      multi: true,
    },
  ],
  styleUrl: './template-id-input.component.scss',
})
export class TemplateIdInputComponent
  extends InputComponentBase
  implements OnInit, OnDestroy
{
  constructor(private templateService: TemplateService) {
    super();
  }

  template$ = this.templateService.getAllTemplate(9999);
  @Output('templateId') templateId = new EventEmitter<string>();
  @Input('allowClear') allowClear: boolean = false;
  templateIdSubscription!: Subscription;
  ngOnInit() {
    this.addControl('templateId', this.validators['templateId']);
    this.templateIdSubscription = this.formGroup
      .get('templateId')
      ?.valueChanges.subscribe((value) =>
        this.templateId.emit(value)
      ) as Subscription;
  }
  ngOnDestroy() {
    if (this.templateIdSubscription) this.templateIdSubscription.unsubscribe();
  }
}
