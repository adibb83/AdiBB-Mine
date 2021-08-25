import { Injectable } from '@angular/core';
import { LoggerService } from '@services/logger/logger.service';
import { ApiClientService } from '../api-client/api-client.service';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '@models/pokemon-types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemonList = new BehaviorSubject<Pokemon[]>([]);
  PokemonList$ = this.pokemonList.asObservable();
  private pokemonsSub = new Subscription();

  constructor(
    private logger: LoggerService,
    private apiClient: ApiClientService
  ) {}

  public init() {
    this.pokemonsSub = this.apiClient.getInfo().subscribe((response) => {
      if (response !== undefined) {
        console.log(response);
        this.pokemonList.next(response);
        this.logger.info(`Got ${response.length} pokemons`);
        this.pokemonsSub.unsubscribe();
      }
    });
  }

  getCartList(): Observable<Pokemon[]> {
    return this.PokemonList$.pipe(map((m) => m.filter((f) => f.isOnCart)));
  }
}
