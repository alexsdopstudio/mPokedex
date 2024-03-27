import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Detailed, Stat } from '../types/detailedResponse';
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
  pokemonStats: { name: string; base_stat: number }[] = [];

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
    //console.log(types.map((type) => type.type.name).join(', '))
    return types.map((type) => type.type.name).join(', ');
    
  }

  extractJapaneseName(langs: any[]): string {
    const japanese = langs.filter((lang) => lang.language.name == 'ja-Hrkt');
    //console.log(japanese[0].name)
    return japanese[0].name;
    
  }

  extractStats(stats: Stat[]): void {
    const fileredStats = stats.map((stat) => {
      return { name: stat.stat.name, base_stat: stat.base_stat };
    });
    this.pokemonStats = fileredStats;
    //console.log(this.pokemonStats);
  }
}
