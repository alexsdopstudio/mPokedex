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
  pokemons: Detailed[] = [];
  paginated$: Observable<Paginated> | undefined;

  getPaginated() {
    this.paginated$ = this.data.getData('pokemon?offset=0&limit=20');
  }

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.getPaginated();
    
  }
}
