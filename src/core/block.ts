import { createId } from './id'

export type BlockId = string

export enum BlockType {
  NONE = 'none',
  TASK = 'task',
  NOTE = 'note',
  AREA = 'area',
  ACCOUNT = 'account',
}

export enum BlockLayout {
  NONE = 'none',
}

export class Block {
  id: BlockId
  name: string
  type: BlockType
  layout: BlockLayout
  ranking: number
  createdAt: number
  updatedAt: number

  constructor(block: Partial<Block>) {
    this.id = block.id || createId()
    this.name = block.name || ''
    this.type = block.type || BlockType.NONE
    this.layout = block.layout || BlockLayout.NONE
    this.ranking = block.ranking || 0
    this.createdAt = block.createdAt || Date.now()
    this.updatedAt = block.updatedAt || Date.now()
  }

  static create({ name, type }: Partial<Block>) {
    return new Block({
      name,
      type,
    })
  }
}
