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
  listSub!: Subscription;

  constructor(
    private pokemonService: PokemonService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.logger.debug('init Cart Page');
    this.listSub = this.pokemonService.updateCart.subscribe((e) => {
      if (e) {
        this.pokemons$ = this.pokemonService.CartList$;
      }
    });
  }

  ngOnDestroy() {
    if (this.listSub) {
      this.listSub.unsubscribe();
    }
  }
}
