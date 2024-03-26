import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Paginated, Results } from '../../types/paginatedResponse';
import { Detailed } from '../../types/detailedResponse';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.css',
})
export class TableRowComponent implements OnInit {
  @Input() pokemon!: Results;
  pokemonDetail$: Observable<Detailed> | undefined;
  page: string | undefined;

  constructor(public http: DataService, public route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.pokemonDetail$ = this.http.getData('pokemon', this.pokemon.name);
    this.page = `card/${this.pokemon.name}`;
    //console.log(this.route.snapshot.paramMap.get('name'));
  }

  extractTypeNames(types: any[]): string {
    return types.map(obj => obj.type.name).join(', ');
  }


}
