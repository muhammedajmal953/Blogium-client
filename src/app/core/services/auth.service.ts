import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponseUser } from '../models/IApiResponse';
import { HttpClient } from '@angular/common/http';
import { env } from '../../../environments/environments';
import { IUserLogin, IUserSignUp } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backEndApi:string=env.backendApi
  constructor(private _http: HttpClient) { }

  register(formData:IUserSignUp):Observable<IApiResponseUser> {
    return this._http.post<IApiResponseUser>(`${this.backEndApi}/user`,formData)
  }

  login(formData:IUserLogin):Observable<IApiResponseUser> {
    return this._http.post<IApiResponseUser>(`${this.backEndApi}/login`,formData)
  }

  isLoggedIn(): Observable<IApiResponseUser>{
    return this._http.post<IApiResponseUser>(`${this.backEndApi}/isLoggedIn`,{})
  }
  logout():Observable<IApiResponseUser>{
    return this._http.post<IApiResponseUser>(`${this.backEndApi}/logout`,{})
  }
}
