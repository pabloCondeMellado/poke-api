import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private _baseUrl: string="https://pokeapi.co/api/v2/pokemon";
  private _httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  public getList(baseUrl: string= this._baseUrl): Observable<any>{
    return this._httpClient.get(baseUrl);
  }

    public getDetail(id: number): Observable<any>{
      return this._httpClient.get(this._baseUrl + "/" + id);
    }
}
