import { Block, Entry, Repository } from '../../core'
import { BlockId } from '../../core/block'
import { Action, Command, Criteria } from '../../core/repository'

export class MemoryRepository extends Repository {
  blocks: Block[] = []
  entries: Entry[] = []

  async query(criteria: Criteria): Promise<Block[]> {
    if (criteria.blockId) {
      return this.blocks.filter((block) => block.id === criteria.blockId)
    }

    return this.blocks
  }

  async getEntries(blockId: BlockId): Promise<Entry[]> {
    return this.entries.filter((entry) => entry.blockId === blockId)
  }

  async command(command: Command, block: Block): Promise<void> {
    switch (command.action) {
      case Action.ADD:
        this.blocks.push(block)
        break
    }
  }
}
