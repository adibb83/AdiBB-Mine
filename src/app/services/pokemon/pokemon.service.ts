import { Injectable } from '@angular/core';
import { LoggerService } from '@services/logger/logger.service';
import { ApiClientService } from '../api-client/api-client.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Pokemon } from '@models/pokemon-types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemonList = new BehaviorSubject<Pokemon[]>([]);
  private pokemonsSub = new Subscription();
  updateCart = new BehaviorSubject<boolean>(true);

  constructor(
    private logger: LoggerService,
    private apiClient: ApiClientService
  ) { }

  get PokemonList$() {
    return this.pokemonList.asObservable();
  }

  get CartList$() {
    return this.PokemonList$.pipe(map((m) => m.filter((f) => f.isOnCart)));
  }

  // get pokemons list id/Image from server --- global error handling
  public init() {
    this.pokemonsSub = this.apiClient.getInfo().subscribe((response) => {
      if (response !== undefined) {
        this.pokemonList.next(response);
        this.logger.info(`Got ${response.length} pokemons`);
        this.pokemonsSub.unsubscribe();
      }
    });
  }
}
