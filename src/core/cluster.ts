import { Block } from './block'

export class Criteria {}

export class Command {}

export abstract class Cluster {
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
