import { Component, OnInit } from '@angular/core';
import { Pokemon } from '@models/pokemon-types';
import { PokemonService } from '@services/pokemon/pokemon.service';
import { Subscription } from 'rxjs';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  pokemons$!: Observable<Pokemon[]>;
  listSub!: Subscription;

  constructor(private pokemonService: PokemonService) {
    this.listSub = this.pokemonService.updateCart.subscribe((e) => {
      if (e) {
        this.pokemons$ = this.pokemonService.CartList$;
      }
    });
  }

  ngOnInit(): void {
    if (this.listSub) {
      this.listSub.unsubscribe();
    }
  }
}
