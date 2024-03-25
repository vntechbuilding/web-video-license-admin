import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { MenuService } from '../menu.service';
import { map, of, ReplaySubject, switchMap } from 'rxjs';
import { FlattenMultiLevel } from '../../../shared/utils/flatten-multi-level';
import { ContentImageInputComponent } from '../../../shared/component/content-image-input/content-image-input.component';
import { DisabledInputComponent } from '../../../shared/component/disabled-input/disabled-input.component';
import { HeadMetaInputComponent } from '../../../shared/component/head-meta-input/head-meta-input.component';
import {
  NzOptionComponent,
  NzSelectComponent,
  NzSelectModule,
} from 'ng-zorro-antd/select';
import {
  NzInputNumberComponent,
  NzInputNumberModule,
} from 'ng-zorro-antd/input-number';
import { DomainInputByUserComponent } from '../../../shared/component/domain-input-by-user/domain-input-by-user.component';
import { UserIdInputComponent } from '../../../shared/component/user-id-input/user-id-input.component';

@Component({
  selector: 'app-menu-create',
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
  templateUrl: './menu-create.component.html',
  styleUrl: './menu-create.component.scss',
})
export class MenuCreateComponent
  extends Mixin(FormBase, ModalContentBase)
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
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
      url: ['', [Validators.required]],
      sortOrder: [0, [Validators.required]],
      parentId: [''],
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
        .createMenu(this.removeBlankString(this.validateForm.value) as any)
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
