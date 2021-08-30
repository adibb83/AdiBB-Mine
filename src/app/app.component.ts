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
  sideNavOpened = false;
  constructor(
    private logger: LoggerService
  ) { }

  ngOnInit(): void {
    this.logger.debug('init AppComponent');
  }

  toggleSideNave() {
    this.sideNavOpened = !this.sideNavOpened;
  }
}
