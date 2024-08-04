import { v4 } from 'uuid'

export type BlockId = string

export enum BlockLayout {
  NONE = 'none',
  TASK = 'task',
  NOTE = 'note',
}

export class Block {
  id: BlockId
  name: string
  layout: BlockLayout
  content: string
  createdAt: number
  updatedAt: number

  constructor(block: Partial<Block>) {
    this.id = block.id || v4()
    this.name = block.name || ''
    this.layout = block.layout || BlockLayout.NONE
    this.content = block.content || ''
    this.createdAt = block.createdAt || Date.now()
    this.updatedAt = block.updatedAt || Date.now()
  }

  static create({
    name,
    layout,
    content,
  }: Omit<Block, 'id' | 'createdAt' | 'updatedAt'>) {
    return new Block({
      name,
      layout,
      content,
    })
  }
}
