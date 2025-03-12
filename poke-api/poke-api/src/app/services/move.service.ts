import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoveService {
 private _httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
   }

   public getDetail(url:string): Observable<any>{
    return this._httpClient.get(url);
   }
}
