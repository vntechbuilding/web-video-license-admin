import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { domain, DomainService } from '../domain.service';
import { ContentImageInputComponent } from '../../../shared/component/content-image-input/content-image-input.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-domain-favicon',
  standalone: true,
  imports: [
    NzFormModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule,
    CommonModule,
    ContentImageInputComponent,
  ],
  templateUrl: './domain-favicon.component.html',
  styleUrl: './domain-favicon.component.scss',
})
export class DomainFaviconComponent
  extends Mixin(FormBase, ModalContentBase<domain>)
  implements OnInit
{
  constructor(private domainService: DomainService) {
    super();
  }
  uploadFaviconUrl = environment.uploadFaviconUrl + this.nzModalData.id + '/';
  ngOnInit() {
    this.defaultValue['favicon'] = 'favicon.ico';
    this.validateForm = this.fb.group({
      favicon: [''],
      domainId: [this.nzModalData.id],
    });
  }

  override _formErrorMsg = {};

  submitForm() {
    if (this.formValid()) {
      this.domainService
        .updateDomainFavicon(
          this.removeBlankString({
            ...this.validateForm.value,
            domainId: this.nzModalData.id,
          }) as any
        )
        .pipe(this.httpErrorOperator('favicon'))
        .subscribe((data) => {
          this.destroyModal(data);
        });
    }
  }
}
