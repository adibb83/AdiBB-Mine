import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from '@models/pokemon-types';
import { LoggerService } from '@services/logger/logger.service';
import { PokemonService } from '@services/pokemon/pokemon.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  pokemons$!: Observable<Pokemon[]>;
  pokemonListSub!: Subscription;

  constructor(
    private pokemonService: PokemonService,
    private logger: LoggerService
  ) { }

  // in a different approach we can use resolver to get the data
  ngOnInit(): void {
    this.logger.debug('init Cart Page');
    this.pokemonListSub = this.pokemonService.updateCart.subscribe((update) => {
      if (update) {
        this.pokemons$ = this.pokemonService.CartList$;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.pokemonListSub) {
      this.pokemonListSub.unsubscribe();
    }
  }
}
