import { v4 } from 'uuid'

export type BlockId = string

export enum BlockType {
  NONE = 'none',
  TASK = 'task',
  NOTE = 'note',
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
  content: string
  createdAt: number
  updatedAt: number

  constructor(block: Partial<Block>) {
    this.id = block.id || v4()
    this.name = block.name || ''
    this.type = block.type || BlockType.NONE
    this.layout = block.layout || BlockLayout.NONE
    this.ranking = block.ranking || 0
    this.content = block.content || ''
    this.createdAt = block.createdAt || Date.now()
    this.updatedAt = block.updatedAt || Date.now()
  }

  static create({
    name,
    type,
    content,
  }: Omit<Block, 'id' | 'layout' | 'ranking' | 'createdAt' | 'updatedAt'>) {
    return new Block({
      name,
      type,
      content,
    })
  }
}
