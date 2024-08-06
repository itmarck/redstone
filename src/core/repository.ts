import { Block, BlockId, BlockType } from './block'

export enum Action {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete',
}

export interface Criteria {
  type?: BlockType
  sortBy?: string
}

export interface Command {
  action: Action
  blockId?: BlockId
}

export abstract class Repository {
  /**
   * Filters all items in the collection.
   * @param criteria Options to filter by.
   * @returns The filtered items.
   */
  abstract query(criteria: Criteria): Promise<Block[]>
  /**
   * Applies a command to an item in the collection.
   * @param command Action to apply.
   * @param item Item to be modified.
   * @returns The processed item.
   */
  abstract command(command: Command, block: Block): Promise<Block>
}
