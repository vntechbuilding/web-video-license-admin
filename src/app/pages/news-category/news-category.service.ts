import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { domain } from '../domain/domain.service';
export declare type NewsCategory = {
  id: string;
  description: string | null;
  summary: string | null;
  image: string | null;
  title: string;
  createdAt: Date;
  disabled: boolean;
  domainId: string;
  rootId: string | null;
  parentId: string | null;
  left: number;
  right: number;
  children: NewsCategory[];
  domain?: domain;
  url?: string;
};
@Injectable({
  providedIn: 'root',
})
export class NewsCategoryService {
  constructor(private http: HttpClient) {}

  allCategories() {
    return this.http.get<NewsCategory[]>(environment.apiUrl + `news-category`);
  }

  allDomainCategory(domainId: string) {
    return this.http.get<NewsCategory[]>(
      environment.apiUrl + `news-category/${domainId}`
    );
  }

  createCategory(createData: any) {
    return this.http.post<NewsCategory>(
      environment.apiUrl + `news-category`,
      createData
    );
  }

  updateCategory(updateData: any) {
    return this.http.put<NewsCategory>(
      environment.apiUrl + `news-category`,
      updateData
    );
  }

  deleteNewsCategory(categoryId: string) {
    return this.http.delete(environment.apiUrl + `news-category/${categoryId}`);
  }
}
