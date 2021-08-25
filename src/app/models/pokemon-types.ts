export class PokemonsResponse {
  results: Pokemon[];
}

export class Pokemon {
  id?: number;
  name: string;
  imgUrl?: string;
  isOnCart: boolean = false;
}
