import { Injectable } from '@angular/core';
import {
  dataType,
  templateData,
  templateType,
} from '../template-data/template-data.service';
import { domain } from '../domain/domain.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { create } from 'lodash';
export declare type domainTemplateConfigItem = templateData & {
  refId: string;
  content: any;
};
export declare type domainTemplateConfigType = {
  [code: string]: domainTemplateConfigItem;
} | null;
export declare type domainTemplateConfig = {
  [key in templateType]: domainTemplateConfigType;
};
export declare type domainTemplate = {
  id: string;
  domainId: string;
  domain: domain;
  templateType: templateType;
  code: string;
  refId?: string;
  content?: string;
};
@Injectable({
  providedIn: 'root',
})
export class DomainTemplateService {
  constructor(private http: HttpClient) {}

  getDomainTemplateConfig(domainId: string) {
    return this.http.get<domainTemplateConfig>(
      environment.apiUrl + `domain-template/${domainId}`
    );
  }

  createDomainTemplate(createData: domainTemplate & { dataType: dataType }) {
    return this.http.post<domainTemplate>(
      environment.apiUrl +
        `domain-template/` +
        createData.dataType.toLowerCase(),
      createData
    );
  }
}
