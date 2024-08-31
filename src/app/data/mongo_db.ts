import { Block, Cloud } from '../../core'

// TODO
export class MongoDbCloud implements Cloud {
  pull(): Promise<Block[]> {
    throw new Error('Method not implemented.')
  }
  commit(block: Block): Promise<void> {
    block
    throw new Error('Method not implemented.')
  }
}
