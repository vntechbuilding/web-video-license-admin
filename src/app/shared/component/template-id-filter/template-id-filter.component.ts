import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { FormBase } from '../../base/form-base';
import { debounceTime, Subscription, tap } from 'rxjs';
import {
  template,
  TemplateService,
} from '../../../pages/template/template.service';
export declare type TemplateIdFilter = template;

@Component({
  selector: 'app-template-id-filter',
  standalone: true,
  imports: [
    NzFormModule,
    NzGridModule,
    NzInputModule,
    ReactiveFormsModule,
    NzSelectModule,
    CommonModule,
  ],
  templateUrl: './template-id-filter.component.html',
  styleUrl: './template-id-filter.component.scss',
})
export class TemplateIdFilterComponent
  extends FormBase
  implements OnInit, OnDestroy
{
  @Output() filter = new EventEmitter<TemplateIdFilter>();
  constructor(private templateService: TemplateService) {
    super();
  }
  template: template[] = [];
  template$ = this.templateService.getAllTemplate(1000).pipe(
    tap((templateData) => {
      this.template = templateData.data;
      this.validateForm.patchValue({ templateId: this.template[0].id });
    })
  );

  valueSubscription!: Subscription;
  ngOnInit() {
    this.validateForm = this.fb.group({
      templateId: [''],
    });
    let lastValue: TemplateIdFilter;
    this.valueSubscription = this.validateForm.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value) => {
        if (JSON.stringify(value) === JSON.stringify(lastValue)) return;
        if (!lastValue || lastValue.id !== value.templateId) {
          lastValue = this.template.find(
            (item) => item.id === value.templateId
          ) as template;
          this.filter.next(lastValue);
        }
      });
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    if (this.valueSubscription) this.valueSubscription.unsubscribe();
  }
}
