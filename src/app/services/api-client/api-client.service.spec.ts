import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiClientService } from './api-client.service';
import { environment } from 'src/environments/environment';
import { Pokemon } from '@models/pokemon-types';

describe('ApiClientService', () => {

  let apiClientService: ApiClientService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiClientService
      ]
    });

    apiClientService = TestBed.inject(ApiClientService),
      httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('api-service should be created', () => {
    expect(apiClientService).toBeTruthy();
  });

  it('api-service should have apiEndpoint in Enviroment', () => {
    expect(environment.pokNamesUrl).toBeDefined();
    expect(environment.pokImgUrl).toBeDefined();
  });


  it('api-service should return an Observable of pokemon', () => {

    apiClientService.getInfo().subscribe(pokemons => {

      expect(pokemons.length).toBeGreaterThan(10, 'incorrect number of pokemons');
      expect(pokemons).toBeTruthy('No pokemons returned');
      const pokemon = pokemons.find(pokemon => pokemon.id === 1);
      expect(pokemon.name).toBe('bulbasaur');
    });

    const req = httpTestingController.expectOne(`${environment.pokNamesUrl}40`);
    expect(req.request.method).toEqual('GET');
    req.flush({ payload: Object.values(Pokemon) });
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});

