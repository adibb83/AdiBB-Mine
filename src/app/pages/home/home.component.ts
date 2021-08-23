import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '@services/pokemon.service';
import { Pokemon } from '@models/pokemon-types';
import { Subscription } from 'rxjs';
import { LoggerService } from '@services/logger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  pokemons: Pokemon[] = [];
  private pokemonsSub = new Subscription();

  constructor(
    private pokemonService: PokemonService,
    private logger: LoggerService
  ) {}

  ngOnDestroy(): void {
    this.pokemonsSub.unsubscribe();
  }

  ngOnInit(): void {
    this.logger.debug('init HomeComponent');
    this.pokemonsSub = this.pokemonService.PokemonList$.subscribe(
      (result) => (this.pokemons = result)
    );
  }
}
