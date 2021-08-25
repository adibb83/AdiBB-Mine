import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from '@models/pokemon-types';

@Component({
  selector: 'app-pok-card',
  templateUrl: './pok-card.component.html',
  styleUrls: ['./pok-card.component.scss'],
})
export class PokCardComponent implements OnInit {
  @Input() cardData: Pokemon;
  @Output() updateCart = new EventEmitter<Pokemon>();

  constructor() { }

  ngOnInit(): void { }

  update() {
    this.cardData.isOnCart = !this.cardData.isOnCart;
    this.updateCart.emit(this.cardData);
  }
}
