import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateInfo } from './StateInfo';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  stateInfoUrl = "https://api.covid19india.org/data.json";

  constructor(private httpClient: HttpClient) { }

  getStateInfo(): any {
    return this.httpClient.get<any>(`${this.stateInfoUrl}`);
  }



}


