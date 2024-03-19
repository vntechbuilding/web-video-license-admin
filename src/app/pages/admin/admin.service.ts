import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PasswordConfirm } from '../../shared/types/password-confirm.type';
import { map } from 'rxjs';
export declare type admin = {
  id: string;
  username: string;
  disabled: boolean;
  createdAt: string | Date;
};
export declare type adminCreate = Omit<admin, 'createdAt'> & PasswordConfirm;
export declare type adminUpdate = Omit<admin, 'createdAt' | 'username'>;
export declare type adminChangePassword = PasswordConfirm & Pick<admin, 'id'>;
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  getAllAdmin(perPage = 10, page = 0) {
    return this.http
      .get<[admin[], count: number]>(
        environment.apiUrl + `admin?perPage=${perPage}&page=${page}`
      )
      .pipe(
        map(([adminData, count]) => {
          return {
            admin: adminData,
            count,
          };
        })
      );
  }
  getAdminById(id: string) {
    return this.http.get<admin>(environment.apiUrl + `admin/${id}`);
  }
  createAdmin(create: adminCreate) {
    return this.http.post<admin>(environment.apiUrl + `admin`, create);
  }
  updateAdmin(update: adminUpdate) {
    return this.http.put<admin>(environment.apiUrl + `admin`, update);
  }
  deleteAdmin(adminId: string) {
    return this.http.delete(environment.apiUrl + `admin/${adminId}`);
  }

  changePassword(change: adminChangePassword) {
    return this.http.put<admin>(
      environment.apiUrl + `admin/change-password`,
      change
    );
  }
}
