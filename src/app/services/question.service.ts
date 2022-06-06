import { environment } from './../../environments/environment';
import { SingleResponseModel } from './../models/singleResponseModel';
import { Question } from './../models/question';
import { ListResponseModel } from './../models/listResponseModel';
import { ResponseModel } from './../models/responseModel';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { LocalStorageService } from './local-storage/local-storage.service';
import { QuestionWithAnswer } from '../models/questionWithAnswer';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  apiUrl = environment.apiUrl + "Questions/";
  constructor(private httpClient: HttpClient,private localStorage:LocalStorageService) {}
  getAllQuestions():Observable<ListResponseModel<Question>>{
    let token = this.localStorage.get<string>("token");
    let headers = new HttpHeaders()
    .set("Authorization","Bearer " + token);
    let newPath = this.apiUrl + 'getallquestions';
    return this.httpClient.get<ListResponseModel<Question>>(newPath,{headers});
  }
  saveQuestions(questions:QuestionWithAnswer[]):Observable<ResponseModel>{
    let token = this.localStorage.get<string>("token");
    let headers = new HttpHeaders()
    .set("Authorization","Bearer " + token);
    let newPath = this.apiUrl + 'saveanswer';
    return this.httpClient.post<ResponseModel>(newPath,questions,{headers});
  }
}
