import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { user } from '../user/user.service';
import { template } from '../template/template.service';
export declare type domain = {
  id: string;
  domain: string;
  https: boolean;
  createdAt: Date;
  disabled: boolean;
  userId: string;
  user?: user;
  templateId: string;
  template?: template;
};
export declare type domainGetAll = {
  data: domain[];
  count: number;
};
@Injectable({
  providedIn: 'root',
})
export class DomainService {
  constructor(private http: HttpClient) {}

  allDomains(perPage: number, page: number) {
    return this.http.get<domainGetAll>(
      environment.apiUrl + `domain?perPage=${perPage}&page=${page}`
    );
  }

  allUserDomain(userId: string) {
    return this.http.get<domain[]>(
      environment.apiUrl + `domain/user/${userId}`
    );
  }

  createDomain(createData: any) {
    return this.http.post<domain>(environment.apiUrl + `domain`, createData);
  }
  updateDomainFavicon(updateData: any) {
    return this.http.patch<domain>(
      environment.apiUrl + `domain/favicon`,
      updateData
    );
  }
  updateDomain(updateData: any) {
    return this.http.put<domain>(environment.apiUrl + `domain`, updateData);
  }
}
