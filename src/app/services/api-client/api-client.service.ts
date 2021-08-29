import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '@services/logger/logger.service';
import { forkJoin, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { Pokemon } from '@models/pokemon-types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private maxItems = 40;

  // API Docs: https://pokeapi.co/docs/v2#pokemon
  constructor(
    private logger: LoggerService,
    private httpClient: HttpClient) { }

  // get pokemons names
  public getPokemons(): Observable<any[]> {
    this.logger.info('fetching pokemons');
    return this.httpClient
      .get<any[]>(`${environment.pokNamesUrl}${this.maxItems}`)
      .pipe(map((res) => res['results']));
  }

  // convert pokemon names to pokemone data by name and create new list
  getInfo(): Observable<Pokemon[]> {
    this.logger.info('fetching pokemons ids/images');
    return this.getPokemons().pipe(
      concatMap((pokList) => {
        return forkJoin(
          pokList.map((pok) =>
            this.httpClient.get<any>(`${environment.pokImgUrl}${pok.name}`)
          )
        ).pipe(
          map((recordsArrays) =>
            recordsArrays.reduce(
              (arr, r) =>
                arr.concat({
                  id: r['id'],
                  name: r['name'],
                  imgUrl: r['sprites']['front_default'],
                  power: r['base_experience'],
                  isOnCart: false,
                } as Pokemon),
              []
            )
          )
        );
      })
    );
  }
}
