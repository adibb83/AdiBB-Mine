import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiClientService } from './api-client.service';
import { environment } from 'src/environments/environment';
import { LoggerService } from '@services/logger/logger.service';

describe('ApiClientService', () => {
  let service: ApiClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiClientService,
        LoggerService
      ],
    });
    service = TestBed.inject(ApiClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('api-service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('api-service should have apiEndpoint in Enviroment', () => {
    expect(environment.pokNamesUrl).toBeDefined();
    expect(environment.pokImgUrl).toBeDefined();
  });



  it('api-service should return an Observable of pokemon names ', () => {
    const dummyPokemon = {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/'
    };
    service.getPokemons().subscribe(res => {
      if (res !== undefined) {
        expect(res['results'].length).toBeGreaterThan(0);
        expect(res['results'][0]).toEqual(dummyPokemon);
      }
    });


    const req = httpMock.expectOne(`${environment.pokNamesUrl}30`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPokemon);
  });

  afterEach(() => {
    httpMock.verify();
  });

});
