import { Injectable } from '@angular/core';
import { Meta } from '../../shared/utils/meta-schema';
import { Rating } from '../../shared/utils/rating-schema';
import { domain } from '../domain/domain.service';
import { author } from '../author/author.service';
import { publisher } from '../publisher/publisher.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { video } from '../video/video.service';
export declare type page = {
  id: string;
  title: string;
  url: string;
  summary: string;
  image: string;
  createdAt: Date;
  uploadDate: Date;
  disabled: boolean;
  domainId: string;
  domain?: domain;
  authorId: string;
  author?: author;
  publisherId: string;
  publisher?: publisher;
  videoId: string;
  video?: video;
} & Meta &
  Rating;
export declare type pageResponse = {
  data: page[];
  count: number;
};
@Injectable({
  providedIn: 'root',
})
export class PageService {
  constructor(private http: HttpClient) {}
  getAllPage(perPage: number = 9999, page: number = 0) {
    return this.http.get<pageResponse>(
      environment.apiUrl + `page?perPage=${perPage}&page=${page}`
    );
  }

  getAllUserPage(userId: string, perPage: number = 9999, page: number = 0) {
    return this.http.get<pageResponse>(
      environment.apiUrl + `page/user/${userId}?perPage=${perPage}&page=${page}`
    );
  }

  getAllDomainPage(domainId: string, perPage: number = 9999, page: number = 0) {
    return this.http.get<pageResponse>(
      environment.apiUrl +
        `page/domain/${domainId}?perPage=${perPage}&page=${page}`
    );
  }

  createPage(createData: any) {
    return this.http.post(environment.apiUrl + `page`, createData);
  }
  updatePage(updateData: any) {
    return this.http.put(environment.apiUrl + `page`, updateData);
  }
  deletePage(pageId: string) {
    return this.http.delete(environment.apiUrl + `page/${pageId}`);
  }
}
