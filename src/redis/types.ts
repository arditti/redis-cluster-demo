export interface Shard {
  id: string;
  slot: {
    min: number;
    max: number;
  }
  keys: {
    [key: string]: Key;
  }
}

export interface Key {
  hash: number;
}
