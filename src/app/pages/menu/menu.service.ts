import { Injectable } from '@angular/core';
import { domain } from '../domain/domain.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
export declare type menu = {
  id: string;
  title: string;
  url: string;
  text: string;
  sortOrder: number;
  createdAt: Date;
  parentId?: string;
  parent?: menu;
  children: menu[];
  domainId: string;
  domain: domain;
};

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient) {}

  getAllMenu() {
    return this.http.get<menu[]>(environment.apiUrl + `menu`);
  }

  getAllUserMenu(userId: string) {
    return this.http.get<menu[]>(environment.apiUrl + `menu/user/${userId}`);
  }

  getAllDomainMenu(domainId: string) {
    return this.http.get<menu[]>(
      environment.apiUrl + `menu/domain/${domainId}`
    );
  }

  createMenu(createData: any) {
    return this.http.post<menu>(environment.apiUrl + `menu`, createData);
  }

  updateMenu(updateData: any) {
    return this.http.put<menu>(environment.apiUrl + `menu`, updateData);
  }

  deleteMenu(menuId: string) {
    return this.http.delete(environment.apiUrl + `menu/${menuId}`);
  }
}
