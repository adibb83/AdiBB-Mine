import { Component, OnInit } from '@angular/core';
import { Pokemon } from '@models/pokemon-types';
import { PokemonService } from '@services/pokemon/pokemon.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  pokemons$!: Observable<Pokemon[]>;
  constructor(private pokemonService: PokemonService) {
    this.pokemonService.updateCart.subscribe(e => {
      if (e) {
        console.log(e);
        this.pokemons$ = this.pokemonService.CartList$;
      }
    }
    );
  }

  ngOnInit(): void {
  }
}
