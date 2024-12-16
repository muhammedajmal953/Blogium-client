import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../environments/environments';
import { IBlog } from '../models/IBlog';
import { Observable } from 'rxjs';
import { IApiResponseBlog } from '../models/IApiResponse';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private _http: HttpClient) { }
  api = env.backendApi

  addBlog(formData: Partial<IBlog>):Observable<IApiResponseBlog> {
    return this._http.post<IApiResponseBlog>(`${this.api}/blog`,formData)
  }

  getAllBlogs() {
    return this._http.get(`${this.api}/get-all-blogs`)
  }

  getOwnBlogs() {
    return this._http.get(`${this.api}/get-own-blogs`)
  }

  getBlog(id: string) {
    return this._http.get<IApiResponseBlog>(`${this.api}/blog?id=${id}`)
  }

  editBlog(id: string,formData:IBlog) {
    return this._http.put(`${this.api}/blog?id=${id}`,formData)
  }

  deleteBlog(id: string) {
    return this._http.delete(`${this.api}/blog?id=${id}`)
  }
}
