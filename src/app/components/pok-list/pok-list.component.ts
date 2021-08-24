import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '@models/pokemon-types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pok-list',
  templateUrl: './pok-list.component.html',
  styleUrls: ['./pok-list.component.scss']
})
export class PokListComponent implements OnInit {

  @Input() pokemons$!: Observable<Pokemon[]>;

  constructor() { }

  ngOnInit(): void {
  }

}