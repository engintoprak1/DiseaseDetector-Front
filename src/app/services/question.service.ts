import { SingleResponseModel } from './../models/singleResponseModel';
import { Question } from './../models/question';
import { ListResponseModel } from './../models/listResponseModel';
import { ResponseModel } from './../models/responseModel';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { LocalStorageService } from './local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  apiUrl = 'http://46.45.163.22:6161/api/';
  constructor(private httpClient: HttpClient,private localStorage:LocalStorageService) {}
  getAllQuestions():Observable<ListResponseModel<Question>>{
    let token = this.localStorage.get<string>("token");
    let headers = new HttpHeaders()
    .set("Authorization","Bearer " + token);
    let newPath = this.apiUrl + 'questions';
    return this.httpClient.get<ListResponseModel<Question>>(newPath,{headers});
  }
}
