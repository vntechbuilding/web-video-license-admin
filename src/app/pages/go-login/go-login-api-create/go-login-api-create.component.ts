import {Component, OnInit} from '@angular/core';
import {Mixin} from "ts-mixer";
import {FormBase, FormErrorType} from "../../../shared/base/form-base";
import {ModalContentBase} from "../../../shared/base/modal-content-base";
import {GoLoginApiService} from "../go-login-api.service";
import {ReactiveFormsModule, Validators} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";

@Component({
  selector: 'app-go-login-api-create',
  standalone: true,
  imports: [NzFormModule, NzGridModule, NzButtonModule, NzInputModule, ReactiveFormsModule],
  templateUrl: './go-login-api-create.component.html',
  styleUrl: './go-login-api-create.component.scss'
})
export class GoLoginApiCreateComponent extends Mixin(FormBase, ModalContentBase) implements OnInit{
  constructor(private goLoginApiService: GoLoginApiService  ) {
    super();
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      API_KEY: ['', [Validators.required]],
      proxy: ['', {}],
    })
  }
  override _formErrorMsg: FormErrorType = {
    API_KEY: {
      required: "API KEY không được để trống"
    }
  }

  submitForm(){
    if(this.formValid()){
      this.goLoginApiService.createApiKey(this.removeBlankString(this.validateForm.value) as any)
        .pipe(this.httpErrorOperator('API_KEY'))
        .subscribe((data)=>{
        this.destroyModal(data);
      });
    }
  }
}
