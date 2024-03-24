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

  private api = 'https://pokeapi.co/api/v2/';

  getData(ep: string): Observable<Paginated> {
    return this.http.get<Paginated>(`${this.api}${ep}`);
  }

  getPokemonDetails(name: string): Observable<Detailed> {
    return this.http.get<Detailed>(`${this.api}${name}`);
  }

  getDetailedResults(): Observable<Detailed[]> {
    return this.http.get<Paginated>(`${this.api}pokemon?offset=0&limit=20`)
    .pipe(
      switchMap((response: Paginated) => {
        return forkJoin(
          response.results.map((obj: Results) => 
            this.http.get<Detailed>(obj.url)
          )
        )
      })
    );
  }
}
