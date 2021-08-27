import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from '@models/pokemon-types';
import { AuthService } from '@services/auth-service/auth.service';
import { LoggerService } from '@services/logger/logger.service';
import { PokemonService } from '@services/pokemon/pokemon.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = this.auth.isLoggedIn$;
  pokemons$!: Observable<Pokemon[]>;
  listSub!: Subscription;
  constructor(
    private auth: AuthService,
    private logger: LoggerService,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.logger.debug('init HeaderComponent');
    this.listSub = this.pokemonService.updateCart.subscribe((e) => {
      if (e) {
        this.pokemons$ = this.pokemonService.CartList$;
      }
    });
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    if (this.listSub) {
      this.listSub.unsubscribe();
    }
  }
}
