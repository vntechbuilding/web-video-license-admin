import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
export declare type template = {
  id: string;
  name: string;
  description: string;
  code: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  disabled: boolean;
  version: string;
};
export declare type templateResponse = {
  data: template[];
  count: number;
};
@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(private http: HttpClient) {}

  getAllTemplate(perPage: number = 9999, page: number = 0) {
    return this.http.get<templateResponse>(
      environment.apiUrl + `template?perPage=${perPage}&page=${page}`
    );
  }

  createTemplate(createData: any) {
    return this.http.post(environment.apiUrl + `template`, createData);
  }

  updateTemplate(updateData: any) {
    return this.http.put(environment.apiUrl + `template`, updateData);
  }

  updateZip(updateData: any) {
    return this.http.put(environment.apiUrl + `template/zip`, updateData);
  }

  deleteTemplate(templateId: string) {
    return this.http.delete(environment.apiUrl + `template/${templateId}`);
  }
}
