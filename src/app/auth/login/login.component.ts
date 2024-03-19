import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthApiService } from '../../shared/services/auth-api.service';
import { NotificationService } from '../../shared/services/notification.service';
import { FormService } from '../../shared/services/form.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtDataStorageService } from '../../shared/services/jwt-data-storage.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzIconModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  validateForm!: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthApiService,
    private notification: NotificationService,
    private form: FormService,
    private aRouter: ActivatedRoute,
    private router: Router,
    private jwtDataStorage: JwtDataStorageService,
    private nzModal: NzModalService
  ) {}

  isSubmit: boolean = false;
  submitForm(): void {
    if (this.validateForm.valid && !this.isSubmit) {
      this.isSubmit = true;
      this.authService
        .loginRequest(
          this.validateForm.value.username,
          this.validateForm.value.password
        )
        .subscribe({
          complete: () => {},
          error: (error) => {
            this.isSubmit = false;
            this.errors = this.form.setError(
              error,
              this.errors,
              this.validateForm
            );
            this.isSubmit = false;
          },
          next: (res) => {
            if (res && res.accessToken) {
              // console.log(res);
              this.jwtDataStorage.setToken(res);
              const retUrl = this.aRouter.snapshot.queryParams['retUrl'];
              // console.log(retUrl);
              if (retUrl) this.router.navigateByUrl(retUrl).then();
              else this.router.navigateByUrl('/').then();
            } else {
              this.notification.unknownError();
            }
          },
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  errors = {
    username: 'Username is not valid!',
    password: 'Password is not valid!',
  };
  ngOnDestroy() {}

  ngOnInit(): void {
    this.nzModal.closeAll();
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
}
