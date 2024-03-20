import { Injectable } from '@angular/core';
import { PasswordConfirm } from '../../shared/types/password-confirm.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
export declare type user = {
  id: string;
  // username: string;
  fullName: string;
  // accountName: string;
  email: string;
  phone: string;
  balance: number;
  disabled: boolean;
  createdAt: string | Date;
};
export declare type userTransaction = {
  id: string;
  createdAt: Date | string;
  amount: number;
  beforeBalance: number;
  afterBalance: number;
  transactionType: string;
  description: string | null;
  user?: user;
};
export declare type userCreate = Omit<user, 'createdAt' | 'balance'> &
  PasswordConfirm;
export declare type userDeposit = Pick<user, 'id'> & {
  amount: number;
};
export declare type userWithdraw = userDeposit;
export declare type userUpdate = Omit<
  user,
  'createdAt' | 'username' | 'balance'
>;
export declare type userUpdateDisabled = Pick<user, 'id' | 'disabled'>;

export declare type userChangePassword = PasswordConfirm & Pick<user, 'id'>;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUser(perPage = 10, page = 0) {
    return this.http.get<{ data: user[]; count: number }>(
      environment.apiUrl + `user?perPage=${perPage}&page=${page}`
    );
  }

  transactionHistory(userId: string, perPage = 10, page = 0) {
    return this.http.get<{ data: userTransaction[]; count: number }>(
      environment.apiUrl +
        `user/transaction-history/${userId}?perPage=${perPage}&page=${page}`
    );
  }

  createUser(create: userCreate) {
    return this.http.post<user>(environment.apiUrl + `user`, create);
  }

  depositBalance(deposit: userDeposit) {
    return this.http.post<user>(environment.apiUrl + `user/deposit`, deposit);
  }
  withdrawBalance(withdraw: userWithdraw) {
    return this.http.post<user>(environment.apiUrl + `user/withdraw`, withdraw);
  }

  updateUser(update: userUpdate) {
    return this.http.put<user>(environment.apiUrl + `user`, update);
  }
  updateDisabled(update: userUpdateDisabled) {
    return this.http.put<user>(environment.apiUrl + `user/disabled`, update);
  }
  changePassword(change: userChangePassword) {
    return this.http.put<user>(
      environment.apiUrl + `user/change-password`,
      change
    );
  }

  deleteUser(userId: string) {
    return this.http.delete(environment.apiUrl + `user/${userId}`);
  }
}
