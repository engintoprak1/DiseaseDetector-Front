import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient:HttpClient) { }

  getSimulationReport():Observable<SingleResponseModel<string>>{
    return this.httpClient.get<SingleResponseModel<string>>(environment.apiUrl + 'Report');
  }
}
