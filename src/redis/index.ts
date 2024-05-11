import * as encrypt from "./encrypt.ts";
import { clusterChange } from "./events.ts";
import { Shard } from "./types.ts";
import { CLUSTER_MAX_SLOT, CLUSTER_MIN_SLOT, CLUSTER_SLOT_NAME_PREFIX, CLUSTER_SLOTS_COUNT } from "./const.ts";

class Cluster {
  public readonly shards: Shard[] = [];

  constructor() {
    const shard: Shard = {
      id: CLUSTER_SLOT_NAME_PREFIX + this.shards.length,
      slot: { min: CLUSTER_MIN_SLOT, max: CLUSTER_MAX_SLOT - 1 },
      keys: {}
    }
    this.shards.push(shard)
  }

  private reArrangeKeys () {
    for (let i = 0; i < this.shards.length; i++) {
      const shard = this.shards[i];
      const delKeys: string[] = [];

      Object.entries(shard.keys).forEach(([key ,{ hash }]) => {
        if (shard.slot.min < hash && shard.slot.max > hash) return;
        const newKeyShard = this.shards.find((shard) => shard.slot.min < hash && shard.slot.max > hash);
        if(newKeyShard) {
          newKeyShard.keys[key] = { hash };
          delKeys.push(key);
        }
      });

      delKeys.forEach(e => delete shard.keys[e]);
    }
  }

  private updateSlotsRange () {
    const slotsPerNode = Math.floor(CLUSTER_MAX_SLOT / this.shards.length);
    const remainingSlots = CLUSTER_MAX_SLOT % this.shards.length;
    let start = 0;

    for (let i = 0; i < this.shards.length; i++) {
      const end = start + slotsPerNode - 1 + (i < remainingSlots ? 1 : 0);
      this.shards[i].slot.min = start;
      this.shards[i].slot.max = end;
      start = end + 1;
    }
  }

  public addShard () {
    if(this.shards.length === CLUSTER_MAX_SLOT) return;

    const newShard: Shard = {
      id: CLUSTER_SLOT_NAME_PREFIX + this.shards.length,
      slot: { min: 0, max: 0 },
      keys: {}
    }

    this.shards.push(newShard);
    this.updateSlotsRange();
    this.reArrangeKeys();
    window.dispatchEvent(clusterChange);
  }

  public removeShard () {
    if(this.shards.length === 1) return;
    const removedShard = this.shards.pop();
    this.updateSlotsRange();
    this.shards[0].keys = Object.assign(this.shards[0].keys, removedShard?.keys)
    this.reArrangeKeys();
    window.dispatchEvent(clusterChange);
  }

  static isValidKey (key: string): boolean {
    return Boolean(key.replace(/ /g, ""));
  }

  public addKey (key: string){
    if(!Cluster.isValidKey(key)) return;
    const hash = encrypt.hashKey(key);

    if(hash === null) return;

    const slotHash = hash % CLUSTER_SLOTS_COUNT;
    const shard = this.shards.find((shard) => shard.slot.min < slotHash && shard.slot.max > slotHash);

    if(shard) {
      shard.keys[key] = { hash: slotHash };
    }
    window.dispatchEvent(clusterChange);
  }
}

const cluster = new Cluster();
export default cluster;
