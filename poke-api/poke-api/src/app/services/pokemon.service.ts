import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private _baseUrl: string="https://pokeapi.co/api/v2/pokemon";
  private httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public getList(baseUrl: string= this._baseUrl): Observable<any>{
    return this.httpClient.get(baseUrl);
  }

    public getDetail(id: number): Observable<any>{
      return this.httpClient.get(this._baseUrl + "/" + id);
    }

}
