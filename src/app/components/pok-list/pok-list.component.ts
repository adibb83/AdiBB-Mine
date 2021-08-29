import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '@models/pokemon-types';
import { PokemonService } from '@services/pokemon/pokemon.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pok-list',
  templateUrl: './pok-list.component.html',
  styleUrls: ['./pok-list.component.scss'],
})

// this list of cards component was created for more reusable code
export class PokListComponent {
  @Input() pokemons$!: Observable<Pokemon[]>;
  @Input() enableAnimation = false;
  constructor(private pokemonService: PokemonService) { }

  // card event emitter on add/remove card from cart
  updateCard() {
    this.pokemonService.updateCart.next(true);
  }
}
