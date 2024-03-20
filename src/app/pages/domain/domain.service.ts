import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { user } from '../user/user.service';
export declare type domain = {
  id: string;
  domain: string;
  createdAt: Date;
  disabled: boolean;
  userId: string;
  user?: user;
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

  createDomain(createData: any) {
    return this.http.post<domain>(environment.apiUrl + `domain`, createData);
  }

  updateDomain(updateData: any) {
    return this.http.put<domain>(environment.apiUrl + `domain`, updateData);
  }
}
