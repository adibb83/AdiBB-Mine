import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiClientService } from './api-client.service';
import { environment } from 'src/environments/environment';

// first time that im using unit testing --- there allot more to learn :)

describe('ApiClientService', () => {
  let injector: TestBed;
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

    injector = getTestBed();
    apiClientService = injector.inject(ApiClientService);
    httpTestingController = injector.inject(HttpTestingController);

  });

  it('api-service should be created', () => {
    expect(apiClientService).toBeTruthy();
  });

  it('api-service should have apiEndpoint in Enviroment', () => {
    expect(environment.pokNamesUrl).toBeDefined();
    expect(environment.pokImgUrl).toBeDefined();
  });


  it('api-service should return an Observable of pokemon', (done: DoneFn) => {
    // Dummy data to be returned by request.
    const expectedPokNames = [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ];

    apiClientService.getPokemons().subscribe(pokemons => {
      expect(pokemons).toBeTruthy('No pokemons returned');
      done();
    });

    const req = httpTestingController.expectOne(`${environment.pokNamesUrl}40`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedPokNames);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});

