import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Detailed } from '../types/detailedResponse';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
// ??? extends TableRowComponent: now it makes sense, but later?
export class CardComponent {
  pokemonDetail$: Observable<Detailed> | undefined;
  // TODO1: code species interface and show data on template
  pokemonSpecies$: Observable<Detailed> | undefined;
  name = this.route.snapshot.paramMap.get('name');

  constructor(private http: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.name) {
      this.pokemonDetail$ = this.http.getData<Detailed>('pokemon', this.name);
      // TODO2: use interface to type returned data
      this.pokemonSpecies$ = this.http.getData('pokemon-species', this.name);
      console.log(this.pokemonDetail$);
      console.log(this.pokemonSpecies$);
    }

    console.log(this.route.snapshot.paramMap.get('name'));
  }

  extractTypeNames(types: any[]): string {
    return types.map(obj => obj.type.name).join(', ');
  }
  
}
