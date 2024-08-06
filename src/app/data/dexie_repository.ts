import { Dexie, EntityTable } from 'dexie'
import { Action, Repository, Command, Criteria } from '../../core/repository'
import { Block } from '../../core/block'

export class DexieRepository extends Repository {
  dexie

  constructor() {
    super()

    this.dexie = new Dexie('redstone') as Dexie & {
      blocks: EntityTable<Block, 'id'>
    }

    this.dexie.version(1).stores({
      blocks: '++uid, name, type, content',
    })
  }

  async query(criteria: Criteria): Promise<Block[]> {
    let collection = this.dexie.blocks.toCollection()
    let promise

    if (criteria.type) {
      collection = this.dexie.blocks.where('type').equals(criteria.type)
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
        await this.dexie.blocks.add(block)
        break
      default:
        break
    }

    return block
  }
}
