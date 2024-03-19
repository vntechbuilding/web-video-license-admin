import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';
import {NzModalModule} from "ng-zorro-antd/modal";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {NgxWebstorageModule} from "ngx-webstorage";
import {authInterceptorProvider} from "./auth.interceptor";

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideNzI18n(en_US), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient(),  importProvidersFrom(ReactiveFormsModule),importProvidersFrom(HttpClientModule),
    importProvidersFrom(NgxWebstorageModule.forRoot()),
    importProvidersFrom(NzModalModule),
    importProvidersFrom(CKEditorModule),authInterceptorProvider]
};
