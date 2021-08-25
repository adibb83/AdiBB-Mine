import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PokemonService } from '@services/pokemon/pokemon.service';
import { Pokemon } from '@models/pokemon-types';
import { Observable } from 'rxjs';

@Injectable()
export class PokemonServiceResolver implements Resolve<Pokemon[]> {
  constructor(private pokemonService: PokemonService) {}

  resolve(): Observable<Pokemon[]> {
    return this.pokemonService.PokemonList$;
  }
}
