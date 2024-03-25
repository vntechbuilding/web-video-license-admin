import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContentImageInputComponent } from '../../../shared/component/content-image-input/content-image-input.component';
import { DisabledInputComponent } from '../../../shared/component/disabled-input/disabled-input.component';
import { HeadMetaInputComponent } from '../../../shared/component/head-meta-input/head-meta-input.component';
import { NzOptionComponent, NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { DomainInputByUserComponent } from '../../../shared/component/domain-input-by-user/domain-input-by-user.component';
import { UserIdInputComponent } from '../../../shared/component/user-id-input/user-id-input.component';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { menu, MenuService } from '../menu.service';
import { map, of, ReplaySubject, switchMap } from 'rxjs';
import { FlattenMultiLevel } from '../../../shared/utils/flatten-multi-level';

@Component({
  selector: 'app-menu-edit',
  standalone: true,
  imports: [
    NzFormModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule,
    CommonModule,
    ContentImageInputComponent,
    DisabledInputComponent,
    HeadMetaInputComponent,
    NzOptionComponent,
    NzSelectModule,
    NzInputNumberModule,
    DomainInputByUserComponent,
    UserIdInputComponent,
  ],
  templateUrl: './menu-edit.component.html',
  styleUrl: './menu-edit.component.scss',
})
export class MenuEditComponent
  extends Mixin(FormBase, ModalContentBase<menu>)
  implements OnInit
{
  constructor(private menuService: MenuService) {
    super();
  }
  loadMenu$ = new ReplaySubject<string>();
  menu$ = this.loadMenu$.pipe(
    switchMap((domainId) => {
      if (!domainId) return of([]);
      return this.menuService.getAllDomainMenu(domainId);
    }),
    map((menu) => FlattenMultiLevel(menu))
  );
  ngOnInit() {
    this.defaultValue = this.nzModalData;
    this.defaultValue['userId'] = this.nzModalData.domain?.userId;
    this.loadMenu$.next(this.nzModalData.domainId);
    this.validateForm = this.fb.group({
      title: [this.nzModalData.title, [Validators.required]],
      text: [this.nzModalData.text, [Validators.required]],
      url: [this.nzModalData.url, [Validators.required]],
      sortOrder: [this.nzModalData.sortOrder, [Validators.required]],
      parentId: [this.nzModalData.parentId],
    });
  }

  override _formErrorMsg = {
    title: {
      required: 'Tiêu đề không được để trống',
    },
    text: {
      required: 'Nội dung hiển thị không được để trống',
    },
    url: {
      required: 'Url không được để trống',
    },
  };

  submitForm() {
    if (this.formValid()) {
      this.menuService
        .updateMenu({
          ...(this.removeBlankString(this.validateForm.value) as any),
          menuId: this.nzModalData.id,
        })
        .pipe(this.httpErrorOperator('publisher'))
        .subscribe((res) => {
          this.destroyModal(res);
        });
    }
  }

  updateDomainId(domainId: string) {
    this.loadMenu$.next(domainId);
  }
}
