import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paginated, Results } from './types/paginatedResponse';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private api = 'https://pokeapi.co/api/v2/';

  getData(ep: string): Observable<Paginated> {
    return this.http.get<Paginated>(`${this.api}${ep}`);
  }
}
