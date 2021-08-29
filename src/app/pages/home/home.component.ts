import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '@services/pokemon/pokemon.service';
import { Pokemon } from '@models/pokemon-types';
import { Observable, Subscription } from 'rxjs';
import { LoggerService } from '@services/logger/logger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  pokemons$!: Observable<Pokemon[]>;
  private pokemonsSub = new Subscription();

  constructor(
    private pokemonService: PokemonService,
    private logger: LoggerService
  ) { }

  ngOnDestroy(): void {
    if (this.pokemonsSub) { this.pokemonsSub.unsubscribe(); }
  }

  // in a different approach we can use resolver to get the data
  ngOnInit(): void {
    this.logger.debug('init HomeComponent');
    this.pokemons$ = this.pokemonService.PokemonList$;
  }
}
