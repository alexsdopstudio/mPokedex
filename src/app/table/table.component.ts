import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { DataService } from '../data.service';
import { Detailed } from '../types/detailedResponse';
import { Paginated } from '../types/paginatedResponse';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  //pokemons: Detailed[] = [];
  paginated$: Observable<Paginated> | undefined;

  private readonly pokemonsPerPage = 20;

  getPaginated(page: number): void {
    const offset = (page - 1) * this.pokemonsPerPage;
    const limit = this.pokemonsPerPage;
    this.paginated$ = this.data.getData(`pokemon?offset=${offset}&limit=${limit}`);
  }

  onPageChange(e: Event): void {
    const target = e.target as HTMLSelectElement;
    this.getPaginated(parseInt(target.value))
  }

  totalPages(paginated: Paginated): number[]{
    const pagesNumber = Math.ceil((paginated.count / this.pokemonsPerPage));
    return Array.from({length: pagesNumber}, (e,i)=> i+1)
  }

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.getPaginated(1);
  }
}
