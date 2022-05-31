import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { UserAccessToken } from 'src/app/models/userAccessToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiBaseUrl:string="http://46.45.163.22:6161/";
  constructor(private httpClient:HttpClient) { }


  login(loginModel:any):Observable<SingleResponseModel<UserAccessToken>>{
    return this.httpClient.post<SingleResponseModel<UserAccessToken>>(this.apiBaseUrl+"login",loginModel);
  }
}
