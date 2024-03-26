import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalBase } from '../../../shared/base/modal-base';
import { Mixin } from 'ts-mixer';
import {
  domainTemplateConfigItem,
  domainTemplateConfigType,
  DomainTemplateService,
} from '../domain-template.service';
import {
  UserDomainFilter,
  UserDomainFilterComponent,
} from '../../../shared/component/user-domain-filter/user-domain-filter.component';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  shareReplay,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { templateType } from '../../template-data/template-data.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { DomainTemplateEditComponent } from '../domain-template-edit/domain-template-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-domain-template-index',
  standalone: true,
  imports: [
    UserDomainFilterComponent,
    CommonModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzTableModule,
  ],
  templateUrl: './domain-template-index.component.html',
  styleUrl: './domain-template-index.component.scss',
})
export class DomainTemplateIndexComponent
  extends Mixin(ModalBase)
  implements OnInit, OnDestroy
{
  routerSubscription!: Subscription;
  domainId!: string;
  ngOnInit() {
    this.routerSubscription = this.aRouter.params.subscribe((params) => {
      if (
        params &&
        params['domainId'] &&
        this.domainId !== params['domainId']
      ) {
        this.domainId = params['domainId'];
        this.filterData = { userId: '', domainId: params['domainId'] };
        this.loadDataSubject$.next(params['domainId']);
        // console.log(this.domainId);
      }
    });
  }
  ngOnDestroy() {
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
  }

  constructor(
    private domainTemplateService: DomainTemplateService,
    private aRouter: ActivatedRoute,
    private router: Router
  ) {
    super();
    // this.loadData$.subscribe((domainId) => console.log(domainId, !!domainId));
  }
  loadDataSubject$ = new BehaviorSubject<string>('');
  loadData$ = this.loadDataSubject$.asObservable(); //.pipe(shareReplay(1));
  config$: Observable<
    Array<{
      templateType: templateType;
      config: Array<domainTemplateConfigItem>;
    }>
  > = this.loadData$.pipe(
    filter((domainId) => !!domainId),
    switchMap((domainId) =>
      this.domainTemplateService.getDomainTemplateConfig(domainId)
    ),
    map((configData) => {
      const rs: Array<{
        templateType: templateType;
        config: Array<domainTemplateConfigItem>;
      }> = [];
      for (const templateTypeKey of Object.keys(configData)) {
        const configRs: Array<domainTemplateConfigItem> = [];
        const configDataValue =
          configData[templateTypeKey as keyof typeof configData];
        if (configDataValue !== null) {
          for (const value of Object.values(configDataValue)) {
            configRs.push(value);
          }
        }
        rs.push({
          templateType: templateTypeKey,
          config: configRs,
        });
      }
      return rs;
    })
  );

  filterData!: UserDomainFilter;
  filter($event: UserDomainFilter) {
    if ($event.domainId && $event.domainId !== this.domainId) {
      this.router.navigate(['/domain-template', $event.domainId]).then();
      // this.filterData = $event;
      // this.loadDataSubject$.next($event.domainId);
    }
  }

  edit(configValue: domainTemplateConfigItem) {
    this.createComponentModal<
      DomainTemplateEditComponent,
      domainTemplateConfigItem & { domainId: string }
    >(
      {
        nzTitle: 'Chỉnh sửa cấu hình ' + configValue.name,
        nzWidth: '90vw',
      },
      DomainTemplateEditComponent,
      { ...configValue, domainId: this.filterData.domainId }
    ).afterClose.subscribe(() =>
      this.loadDataSubject$.next(this.filterData.domainId)
    );
  }
  uploadTemplateImageUrl = environment.uploadTemplateImageUrl;
}
