import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { Detailed, Stat } from '../types/detailedResponse';
import { Species } from '../types/speciesResponse';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})

// ??? extends TableRowComponent: now it makes sense, but later?
export class CardComponent {
  pokemonDetail$: Observable<Detailed | null> | undefined;
  pokemonSpecies$: Observable<Species> | undefined;
  pathName = this.route.snapshot.paramMap.get('name');
  pokemonStats: { name: string; base_stat: number }[] = [];
  isLoading = true;
  hasError = false;

  constructor(private http: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.pathName) {
      this.pokemonDetail$ = this.http
        .getData<Detailed>('pokemon', this.pathName)
        .pipe(
          tap(() => (this.isLoading = false)),
          catchError((error) => {
            this.isLoading = false;
            this.hasError = true;
            console.error('Error fetching Pokémon details:', error);
            return of(null);
          })
        );

      this.pokemonSpecies$ = this.http.getData<Species>(
        'pokemon-species',
        this.pathName
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
    const filteredStats = stats.map((stat) => {
      return { name: stat.stat.name, base_stat: stat.base_stat };
    });
    this.pokemonStats = filteredStats;
    //console.log(this.pokemonStats);
  }
}
