import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Detailed } from '../types/detailedResponse';
import { Species } from '../types/speciesResponse';

interface LocalizedNames {
  language: {
    name: string;
  };
  name: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
// ??? extends TableRowComponent: now it makes sense, but later?
export class CardComponent {
  pokemonDetail$: Observable<Detailed> | undefined;
  pokemonSpecies$: Observable<Species> | undefined;
  name = this.route.snapshot.paramMap.get('name');

  constructor(private http: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.name) {
      this.pokemonDetail$ = this.http.getData<Detailed>('pokemon', this.name);
      this.pokemonSpecies$ = this.http.getData<Species>(
        'pokemon-species',
        this.name
      );
    }
  }

  extractTypeNames(types: any[]): string {
    return types.map((obj) => obj.type.name).join(', ');
  }

  extractJapaneseName(lang: any[]): string {
    const japaneseObj = lang.filter((obj) => obj.language.name == 'ja-Hrkt');
    return japaneseObj[0].name; 
  }
}
