import { Block, BlockId, BlockType } from './block'
import { Entry } from './entry'

export enum Action {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete',
}

export interface Criteria {
  type?: BlockType
  sortBy?: string
  blockId?: BlockId
}

export interface Command {
  action: Action
  blockId?: BlockId
  entry?: Entry
  noUpdate?: boolean
}

export abstract class Repository {
  /**
   * Cloud storage.
   */
  cloud?: Cloud

  constructor(cloud?: Cloud) {
    this.cloud = cloud
  }

  /**
   * Filters all items in the collection.
   * @param criteria Options to filter by.
   * @returns The filtered items.
   */
  abstract query(criteria: Criteria): Promise<Block[]>

  /**
   * Get entries from a block.
   * @param blockId The id of the block.
   * @returns The entries.
   */
  abstract getEntries(blockId: BlockId): Promise<Entry[]>

  /**
   * Applies a command to an item in the collection.
   * @param command Action to apply.
   * @param item Item to be modified.
   * @returns The processed item.
   */
  abstract command(command: Command, block: Block): Promise<void>
}

export abstract class Cloud {
  abstract signIn(password: string): Promise<void>
  abstract onUserChanged(callback: (user: any) => void): void

  abstract pull(): Promise<Block[]>
  abstract commit(block: Block): Promise<void>
}
