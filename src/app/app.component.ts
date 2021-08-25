import { Component, OnInit } from '@angular/core';
import { LoggerService } from '@services/logger/logger.service';
import { AuthService } from '@services/auth-service/auth.service';
import { PokemonService } from '@services/pokemon/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pokeshop';

  constructor(
    private logger: LoggerService,
    private auth: AuthService,
    private poke: PokemonService
  ) {}

  ngOnInit(): void {
    this.logger.debug('init AppComponent');
    this.bootstrap();
  }

  private bootstrap() {
    this.auth.init();
    this.poke.init();
  }
}
