import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Paginated, Results } from '../types/paginatedResponse';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  private readonly pokemonsPerPage = 10;
  paginated$: Observable<Paginated> | undefined;
  subscription: Subscription | undefined;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.getPaginated(1);
    this.getFilteredByType();
    this.getFilteredByHabitat();
  }

  getPaginated(page: number): void {
    const offset = (page - 1) * this.pokemonsPerPage;
    const limit = this.pokemonsPerPage;
    this.paginated$ = this.data.getData(
      `pokemon?offset=${offset}&limit=${limit}`
    );
  }

  onPageChange(e: Event): void {
    const target = e.target as HTMLSelectElement;
    this.getPaginated(parseInt(target.value));
  }

  totalPages(data: Paginated): number[] {
    const pagesNumber = Math.ceil(data.count / this.pokemonsPerPage);
    return Array.from({ length: pagesNumber }, (e, i) => i + 1);
  }

  // FILTERS
  getFilteredByType() {
    this.subscription = this.data.data$.subscribe((res) => {
      const resultsArray = res.pokemon.map(
        (item: { pokemon: any }) => item.pokemon
      );
      this.paginated$ = of({
        count: res.pokemon.length,
        next: null,
        prev: null,
        results: resultsArray, 
      });
    });
  }

  getFilteredByHabitat() {
    this.subscription = this.data.data$.subscribe((res) => {
      this.paginated$ = of({
        count: res.pokemon_species.length,
        next: null,
        prev: null,
        results: res.pokemon_species,
      });
    });
  }

/*   chunkArray(array: any[], chunkSize: number): any[] {
    let result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      let chunk = array.slice(i, i + chunkSize);
      result.push(chunk);
    }
    return result;
  } */

  removeFilter() {
    this.getPaginated(1);
  }
}
