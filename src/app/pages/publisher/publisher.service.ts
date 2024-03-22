import { Injectable } from '@angular/core';
import { user } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
export declare type publisher = {
  id: string;
  name: string;
  description: string;
  url: string;
  userId: string;
  user?: user;
  createdAt: Date;
};
export declare type publisherResponse = {
  data: publisher[];
  count: number;
};
@Injectable({
  providedIn: 'root',
})
export class PublisherService {
  constructor(private http: HttpClient) {}
  getAllPublisher(perPage: number = 9999, page: number = 0) {
    return this.http.get<publisherResponse>(
      environment.apiUrl + `publisher?perPage=${perPage}&page=${page}`
    );
  }

  getAllUserPublisher(
    userId: string,
    perPage: number = 9999,
    page: number = 0
  ) {
    return this.http.get<publisherResponse>(
      environment.apiUrl +
        `publisher/user/${userId}?perPage=${perPage}&page=${page}`
    );
  }

  createPublisher(createData: any) {
    return this.http.post<publisher>(
      environment.apiUrl + `publisher`,
      createData
    );
  }

  updatePublisher(updateData: any) {
    return this.http.put<publisher>(
      environment.apiUrl + `publisher`,
      updateData
    );
  }

  deletePublisher(publisherId: string) {
    return this.http.delete<publisher>(
      environment.apiUrl + `publisher/${publisherId}`
    );
  }
}
