import { Injectable } from '@angular/core';
import { Meta } from '../../shared/utils/meta-schema';
import { Rating } from '../../shared/utils/rating-schema';
import { video } from '../video/video.service';
import { author } from '../author/author.service';
import { publisher } from '../publisher/publisher.service';
import { domain } from '../domain/domain.service';
import { NewsCategory } from '../news-category/news-category.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
export declare type news = {
  id: string;
  title: string;
  url: string;
  videoId: string;
  video?: video;
  authorId: string;
  author?: author;
  publisherId: string;
  publisher?: publisher;
  summary: string;
  image: string;
  content: string;
  createdAt: Date;
  uploadDate: Date;
  disabled: boolean;
  domainId: string;
  domain?: domain;
  categoryId: string;
  category?: NewsCategory;
} & Meta &
  Rating;
export declare type newsResponse = {
  data: news[];
  count: number;
};
@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getAllNews(perPage: number = 9999, page: number = 0) {
    return this.http.get<newsResponse>(
      environment.apiUrl + `news?perPage=${perPage}&page=${page}`
    );
  }

  getAllUserNews(userId: string, perPage: number = 9999, page: number = 0) {
    return this.http.get<newsResponse>(
      environment.apiUrl + `news/user/${userId}?perPage=${perPage}&page=${page}`
    );
  }

  getAllDomainNews(domainId: string, perPage: number = 9999, page: number = 0) {
    return this.http.get<newsResponse>(
      environment.apiUrl +
        `news/domain/${domainId}?perPage=${perPage}&page=${page}`
    );
  }

  getAllCategoryNews(
    categoryId: string,
    perPage: number = 9999,
    page: number = 0
  ) {
    return this.http.get<newsResponse>(
      environment.apiUrl +
        `news/category/${categoryId}?perPage=${perPage}&page=${page}`
    );
  }

  createNews(createData: any) {
    return this.http.post<news>(environment.apiUrl + `news`, createData);
  }

  updateNews(updateData: any) {
    return this.http.put<news>(environment.apiUrl + `news`, updateData);
  }

  deleteNews(newsId: string) {
    return this.http.delete<news>(environment.apiUrl + `news/${newsId}`);
  }
}
