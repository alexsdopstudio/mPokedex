import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { Paginated, Results } from './types/paginatedResponse';
import { Detailed } from './types/detailedResponse';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  private readonly api = 'https://pokeapi.co/api/v2/';

/*   getDatabyUrl<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  } */

  getData<T>(ep: string, key = ''): Observable<T> {
    return this.http.get<T>(`${this.api}${ep}/${key}`);
  }
}
