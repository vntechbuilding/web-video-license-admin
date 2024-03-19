import { Component } from '@angular/core';
import { Mixin } from 'ts-mixer';
import {PaginationBase} from "../../../shared/base/pagination-base";
import {goLoginAPI, goLoginAPIGetAll, GoLoginApiService} from "../go-login-api.service";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {CommonModule} from "@angular/common";
import {ModalBase} from "../../../shared/base/modal-base";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {FormsModule} from "@angular/forms";
import {GoLoginApiCreateComponent} from "../go-login-api-create/go-login-api-create.component";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {GoLoginApiEditComponent} from "../go-login-api-edit/go-login-api-edit.component";

@Component({
  selector: 'app-go-login-api',
  standalone: true,
  imports: [NzTableModule, NzButtonModule, CommonModule, NzSwitchModule,  FormsModule, NzIconModule, NzToolTipModule, NzPopconfirmModule],
  templateUrl: './go-login-api.component.html',
  styleUrl: './go-login-api.component.scss'
})
export class GoLoginApiComponent extends Mixin(PaginationBase<goLoginAPIGetAll>, ModalBase){
  constructor(private goLoginApiService: GoLoginApiService) {
    super();
  }
  override pageSize = 20;
  public goLoginAPI$ = this.createObservableData((perPage, page) =>
    this.goLoginApiService.getAllApiKey(perPage, page)
  );

  changeDisabled(data: goLoginAPI, b: boolean) {

  }

  create() {
    const modal = this.createComponentModal({
      nzTitle: 'Tạo API KEY',
    }, GoLoginApiCreateComponent);
    modal.afterClose.subscribe(data=>{
      console.log(data)
      if(data && data.API_KEY) this.loadDataSubject$.next(true)
    })
  }

  delete(data: goLoginAPI) {
    return this.goLoginApiService.deleteApiKey(data.API_KEY).subscribe(data=>{
      this.loadDataSubject$.next(true)
    });
  }

  edit(data: goLoginAPI) {
    this.createComponentModal<GoLoginApiEditComponent, goLoginAPI>({
      nzTitle: 'Cập nhật API KEY'
    }, GoLoginApiEditComponent, data).afterClose.subscribe(()=>this.loadDataSubject$.next(true))
  }
}
