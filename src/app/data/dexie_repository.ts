import { Dexie, EntityTable } from 'dexie'
import { Block, Entry } from '../../core'
import { Action, Command, Criteria, Repository } from '../../core/repository'

export class DexieRepository extends Repository {
  blocks
  entries

  constructor() {
    super()

    const dexie = new Dexie('redstone') as Dexie & {
      blocks: EntityTable<Block, 'id'>
      entries: EntityTable<Entry, 'id'>
    }

    dexie.version(1).stores({
      blocks: '&id, name, type, ranking',
      entries: '&id, blockId, type, content',
    })

    dexie.blocks.mapToClass(Block)
    dexie.entries.mapToClass(Entry)

    this.blocks = dexie.blocks
    this.entries = dexie.entries
  }

  async query(criteria: Criteria): Promise<Block[]> {
    let collection = this.blocks.toCollection()
    let promise

    if (criteria.type) {
      collection = this.blocks.where('type').equals(criteria.type)
    }

    if (criteria.blockId) {
      collection = this.blocks.where('id').equals(criteria.blockId)
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
      case Action.UPDATE:
        await this.blocks.update(block.id, { ...block })
        break
      case Action.DELETE:
        await this.blocks.delete(block.id)
        break
      default:
        break
    }

    return block
  }
}
