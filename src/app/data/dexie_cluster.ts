import { Dexie, EntityTable } from 'dexie'
import { Cluster, Command, Criteria } from '../../core/cluster'
import { Block } from '../../core/block'

export class DexieCluster extends Cluster {
  dexie

  constructor() {
    super()

    this.dexie = new Dexie('redstone') as Dexie & {
      blocks: EntityTable<Block, 'id'>
    }

    this.dexie.version(1).stores({
      blocks: '++uid, name, content',
    })
  }

  async query(criteria: Criteria): Promise<Block[]> {
    criteria
    const table = this.dexie.blocks
    const filter = table.toCollection()

    return await filter.sortBy('name')
  }

  async command(command: Command, block: Block): Promise<Block> {
    command
    const table = this.dexie.blocks
    await table.add(block)
    return block
  }
}
