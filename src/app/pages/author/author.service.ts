import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../user/user.service';
import { environment } from '../../../environments/environment';
export declare type author = {
  id: string;
  name: string;
  description: string;
  url: string;
  userId: string;
  user?: user;
  createdAt: Date;
};
export declare type authorResponse = {
  data: author[];
  count: number;
};
@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private http: HttpClient) {}
  getAllAuthor(perPage: number = 9999, page: number = 0) {
    return this.http.get<authorResponse>(
      environment.apiUrl + `author?perPage=${perPage}&page=${page}`
    );
  }

  getAllUserAuthor(userId: string, perPage: number = 9999, page: number = 0) {
    return this.http.get<authorResponse>(
      environment.apiUrl +
        `author/user/${userId}?perPage=${perPage}&page=${page}`
    );
  }

  createAuthor(createData: any) {
    return this.http.post<author>(environment.apiUrl + `author`, createData);
  }

  updateAuthor(updateData: any) {
    return this.http.put<author>(environment.apiUrl + `author`, updateData);
  }

  deleteAuthor(authorId: string) {
    return this.http.delete<author>(environment.apiUrl + `author/${authorId}`);
  }
}
