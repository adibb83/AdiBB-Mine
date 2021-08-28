import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@modules/shared/shard.module';
import { CartRoutingModule } from './cart-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, CartRoutingModule],
})
export class CartModule {}
