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
      blocks: '&id, name, type, ranking, syncedAt',
      entries: '&id, blockId, type, content, syncedAt',
    })

    dexie.blocks.mapToClass(Block)
    dexie.entries.mapToClass(Entry)

    this.blocks = dexie.blocks
    this.entries = dexie.entries
  }

  async query(criteria: Criteria): Promise<Block[]> {
    let collection = this.blocks.toCollection()
    let promise

    const obj: { [key: string]: any } = {}

    if (criteria.type) {
      obj['type'] = criteria.type
    }

    if (criteria.blockId) {
      obj['id'] = criteria.blockId
    }

    if (Object.keys(obj).length > 0) {
      collection = this.blocks.where(obj)
    }

    if (criteria.sortBy) {
      promise = collection.sortBy(criteria.sortBy)
    } else {
      promise = collection.toArray()
    }

    const response = await promise
    return response || []
  }

  async getEntries(blockId: string): Promise<Entry[]> {
    const table = this.entries
    const collection = table.where('blockId').equals(blockId)
    const entries = await collection.sortBy('createdAt')

    return entries
  }

  async command(command: Command, block: Block): Promise<void> {
    const action = command.action
    const blockId = block.id

    switch (action) {
      case Action.ADD:
        if (command.entry) {
          await this.entries.add(command.entry)
        } else {
          await this.blocks.add(block)
          await this.entries.add(Entry.create({ blockId }))
        }
        break
      case Action.UPDATE:
        if (command.entry) {
          await this.entries.update(command.entry.id, { ...command.entry })
          break
        }
        await this.blocks.update(block.id, { ...block })
        break
      case Action.DELETE:
        await this.blocks.delete(block.id)
        break
      default:
        break
    }
  }
}
