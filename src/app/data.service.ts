import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habitat } from './types/habitats';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  private baseUrl = 'https://pokeapi.co/api/v2/'
  
  getData(ep: string): Observable<Habitat>{
    return this.http.get<Habitat>(`${this.baseUrl}${ep}`)
  }
}
