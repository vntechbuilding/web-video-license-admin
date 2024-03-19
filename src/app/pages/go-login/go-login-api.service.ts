import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
export declare type goLoginAPI = {
  API_KEY: string
  createdAt: Date
  proxy: string | null
  disabledTime: Date | null
  disabled: boolean
}

export declare type goLoginFingerprint = {
  id: string
  createdAt: Date
  fingerprint: string
  goLoginAPIId: string | null
}

export declare type goLoginAPIGetAll = {data: goLoginAPI[], count: number}
export declare type goLoginAPIGetAllProfiles = {data: goLoginFingerprint[], count: number}

export declare type goLoginApiCreate = Pick<goLoginAPI, 'API_KEY'>

export declare type goLoginApiUpdate = Pick<goLoginAPI, 'API_KEY' | 'proxy'>
@Injectable({
  providedIn: 'root'
})
export class GoLoginApiService {

  constructor(private http: HttpClient) { }

  getAllApiKey(perPage: number, page: number){
    return this.http.get<goLoginAPIGetAll>(`${environment.apiUrl}go-login-api?perPage=${perPage}&page=${page}`)
  }

  getProfiles(perPage: number, page: number){
    return this.http.get<goLoginAPIGetAllProfiles>(`${environment.apiUrl}go-login-api/profiles?perPage=${perPage}&page=${page}`)
  }

  countProfileInFolder(){
    return this.http.get<number>(`${environment.apiUrl}go-login-api/count-profile-folder`)
  }

  importProfileFolder(){
    return this.http.get(`${environment.apiUrl}go-login-api/import-profile-folder`)
  }

  uploadProfileZip(file: File){
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${environment.apiUrl}go-login-api/profile-zip`, formData)
  }

  createApiKey(create: goLoginApiCreate){
    return this.http.post<goLoginAPI>(`${environment.apiUrl}go-login-api`, create)
  }

  updateApiKey(updateData: goLoginApiUpdate){
    return this.http.put<goLoginAPI>(`${environment.apiUrl}go-login-api`, updateData)
  }

  deleteApiKey(id: string){
    return this.http.delete(`${environment.apiUrl}go-login-api/${id}`)
  }
}
