import { Dexie, EntityTable } from 'dexie'
import { Action, Repository, Command, Criteria } from '../../core/repository'
import { Block } from '../../core/block'

export class DexieRepository extends Repository {
  blocks

  constructor() {
    super()

    const dexie = new Dexie('redstone') as Dexie & {
      blocks: EntityTable<Block, 'id'>
    }

    dexie.version(1).stores({
      blocks: '&id, name, type, ranking',
    })

    dexie.blocks.mapToClass(Block)

    this.blocks = dexie.blocks
  }

  async query(criteria: Criteria): Promise<Block[]> {
    let collection = this.blocks.toCollection()
    let promise

    if (criteria.type) {
      collection = this.blocks.where('type').equals(criteria.type)
    }

    if (criteria.sortBy) {
      promise = collection.sortBy(criteria.sortBy)
    } else {
      promise = collection.toArray()
    }

    const response = await promise
    return response || []
  }

  async command(command: Command, block: Block): Promise<Block> {
    const action = command.action

    switch (action) {
      case Action.ADD:
        await this.blocks.add(block)
        break
      default:
        break
    }

    return block
  }
}
