import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Paginated, Results } from '../../types/paginatedResponse';
import { Detailed } from '../../types/detailedResponse';
import { Observable } from 'rxjs';

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.css',
})
export class TableRowComponent implements OnInit {
  @Input() pokemon!: Results;
  pokemonDetail$: Observable<Detailed> | undefined;


  constructor(private http: DataService) {}

  ngOnInit(): void {
    this.pokemonDetail$ = this.http.getPokemonDetails(`pokemon/${this.pokemon.name}`);
  }
}
