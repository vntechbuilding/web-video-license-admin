import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../user/user.service';
import { environment } from '../../../environments/environment';
export declare type video = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  file: string;
  duration: string;
  totalWatch: number;
  userId: string;
  user?: user;
  createdAt: Date;
  uploadDate: Date;
};
export declare type videoResponse = {
  data: video[];
  count: number;
};
@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {}

  getAllVideo(perPage: number = 9999, page: number = 0) {
    return this.http.get<videoResponse>(
      environment.apiUrl + `video?perPage=${perPage}&page=${page}`
    );
  }

  getAllUserVideo(userId: string, perPage: number = 9999, page: number = 0) {
    return this.http.get<videoResponse>(
      environment.apiUrl +
        `video/user/${userId}?perPage=${perPage}&page=${page}`
    );
  }

  createVideo(createData: any) {
    return this.http.post<video>(environment.apiUrl + `video`, createData);
  }

  updateVideo(updateData: any) {
    return this.http.put<video>(environment.apiUrl + `video`, updateData);
  }

  deleteVideo(videoId: string) {
    return this.http.delete<video>(environment.apiUrl + `video/${videoId}`);
  }
}
