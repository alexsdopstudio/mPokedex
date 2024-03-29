import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, forkJoin, switchMap } from 'rxjs';
import { Paginated, Results } from './types/paginatedResponse';
import { Detailed } from './types/detailedResponse';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  private readonly api = 'https://pokeapi.co/api/v2/';


  private dataSource = new Subject<any>;
  data$ = this.dataSource.asObservable();



  getData<T>(ep: string, key = ''): Observable<T> {
    return this.http.get<T>(`${this.api}${ep}/${key}`);
  }

  fetchData(ep: string, key = '') {
    this.http.get(`${this.api}${ep}/${key}`).subscribe(res => this.dataSource.next(res));
  }
}
