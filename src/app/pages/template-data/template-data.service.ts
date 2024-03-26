import { Injectable } from '@angular/core';
import { template } from '../template/template.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const templateType = {
  DEFAULT: 'DEFAULT',
  HOME: 'HOME',
  NEWS: 'NEWS',
  PAGE: 'PAGE',
  ARTICLE: 'ARTICLE',
};

export type templateType = (typeof templateType)[keyof typeof templateType];

export const dataType = {
  NEWS: 'NEWS',
  NEWS_CATEGORY: 'NEWS_CATEGORY',
  PAGE: 'PAGE',
  MENU: 'MENU',
  TEXT: 'TEXT',
  SCRIPT: 'SCRIPT',
  IMAGE: 'IMAGE',
  CONTENT: 'CONTENT',
};

export type dataType = (typeof dataType)[keyof typeof dataType];

export declare type templateData = {
  id: string;
  templateId: string;
  template?: template;
  templateType: templateType;
  dataType: dataType;
  sortOrder: number;
  name: string;
  config: JSON;
  createdAt: Date;
  code: string;
};
export declare type templateDataResponse = {
  templateType: templateData[];
};
@Injectable({
  providedIn: 'root',
})
export class TemplateDataService {
  constructor(private http: HttpClient) {}
  getAllTemplateData(templateId: string) {
    return this.http.get(environment.apiUrl + `template-data/${templateId}`);
  }

  createTemplateData(createData: any) {
    return this.http.post(environment.apiUrl + `template-data`, createData);
  }

  updateTemplateData(updateData: any) {
    return this.http.put(environment.apiUrl + `template-data`, updateData);
  }

  deleteTemplateData(templateDataId: string) {
    return this.http.delete(
      environment.apiUrl + `template-data/${templateDataId}`
    );
  }
}
