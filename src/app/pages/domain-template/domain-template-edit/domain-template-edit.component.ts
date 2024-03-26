import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { map, of, Subscription, switchMap } from 'rxjs';
import {
  domainTemplateConfigItem,
  DomainTemplateService,
} from '../domain-template.service';
import { InputCkeditorComponent } from '../../../shared/component/input-ckeditor/input-ckeditor.component';
import { ContentImageInputComponent } from '../../../shared/component/content-image-input/content-image-input.component';
import { environment } from '../../../../environments/environment';
import { PageService } from '../../page/page.service';
import { MenuService } from '../../menu/menu.service';
import { FlattenMultiLevel } from '../../../shared/utils/flatten-multi-level';
import { NewsCategoryService } from '../../news-category/news-category.service';
import { FlattenCategories } from '../../../shared/utils/flatten-categories';

@Component({
  selector: 'app-domain-template-edit',
  standalone: true,
  imports: [
    NzFormModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule,
    NzSelectModule,
    CommonModule,
    InputCkeditorComponent,
    ContentImageInputComponent,
  ],
  templateUrl: './domain-template-edit.component.html',
  styleUrl: './domain-template-edit.component.scss',
})
export class DomainTemplateEditComponent
  extends Mixin(
    FormBase,
    ModalContentBase<domainTemplateConfigItem & { domainId: string }>
  )
  implements OnInit, OnDestroy
{
  uploadTemplateImageUrl = environment.uploadTemplateImageUrl;
  constructor(
    private domainTemplateService: DomainTemplateService,
    private pageService: PageService,
    private menuService: MenuService,
    private newsCategory: NewsCategoryService
  ) {
    super();
  }

  page$ = this.pageService.getAllDomainPage(this.nzModalData.domainId, 9999, 0);
  menu$ = this.menuService
    .getAllDomainMenu(this.nzModalData.domainId)
    .pipe(map((menu) => FlattenMultiLevel(menu)));
  newsCategory$ = this.newsCategory
    .allDomainCategory(this.nzModalData.domainId)
    .pipe(map((listCategory) => FlattenCategories(listCategory)));
  ngOnInit() {
    this.defaultValue = this.nzModalData;
    this.validateForm = this.fb.group({
      refId: [this.nzModalData.refId],
      content: [this.nzModalData.content],
    });
  }
  submitForm() {
    this.domainTemplateService
      .createDomainTemplate({
        ...this.nzModalData,
        ...(this.removeBlankString(this.validateForm.value) as any),
        domainId: this.nzModalData.domainId,
      })
      .pipe(this.httpErrorOperator('refId'))
      .subscribe((res) => {
        this.destroyModal(res);
      });
  }
}
