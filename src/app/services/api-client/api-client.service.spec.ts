import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiClientService } from './api-client.service';
import { environment } from 'src/environments/environment';
import { Pokemon } from '@models/pokemon-types';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from '@services/snack-bar/snackbar.service';
import { HttpClientModule } from '@angular/common/http';

describe('ApiClientService', () => {
  let injector: TestBed;
  let service: ApiClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClientModule,
        ApiClientService,
        MatSnackBarModule,
        SnackbarService,
      ],
    });
    injector = getTestBed();
    service = injector.inject(ApiClientService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should have apiEndpoint in Enviroment', () => {
    expect(environment.pokNamesUrl).toBeDefined();
    expect(environment.pokImgUrl).toBeDefined();
  });

  it('should return an Observable <Pokemon[]> ', () => {
    const dummyPokemonList: Pokemon[] = [
      {
        id: 1,
        name: 'pikacho',
        imgUrl:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png',
        power: 150,
        isOnCart: false,
      },
      {
        id: 2,
        name: 'ratatata',
        imgUrl:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png',
        power: 67,
        isOnCart: true,
      },
      {
        id: 3,
        name: 'bulbasaur',
        imgUrl:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png',
        power: 180,
        isOnCart: false,
      },
    ];

    service.getInfo().subscribe((resualt) => {
      expect(resualt).toEqual(dummyPokemonList);
    });

    const req = httpMock.expectOne(`${environment.pokImgUrl}/bulbasaur`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPokemonList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
