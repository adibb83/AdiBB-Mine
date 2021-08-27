import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Pokemon } from '@models/pokemon-types';

@Component({
  selector: 'app-pok-card',
  templateUrl: './pok-card.component.html',
  styleUrls: ['./pok-card.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.5s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class PokCardComponent implements OnInit {
  @Input() cardData: Pokemon;
  @Input() canAnimate = false;
  @Output() updateCart = new EventEmitter<Pokemon>();
  showCard = true;
  constructor() {}

  ngOnInit(): void {}

  update() {
    this.cardData.isOnCart = !this.cardData.isOnCart;
    if (this.canAnimate) this.showCard = !this.showCard;
    this.updateCart.emit(this.cardData);
  }
}
