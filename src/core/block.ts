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
  percent: number
  ranking: number
  createdAt: number
  updatedAt: number
  syncedAt: number = 0
  deletedAt: number = 0

  constructor(block: Partial<Block>) {
    this.id = createId()
    this.name = block.name || ''
    this.type = block.type || BlockType.NONE
    this.layout = block.layout || BlockLayout.NONE
    this.percent = 0
    this.ranking = 0
    this.createdAt = Date.now()
    this.updatedAt = Date.now()
  }

  update() {
    this.updatedAt = Date.now()
    this.syncedAt = 0
  }

  commit() {
    this.updatedAt = Date.now()
    this.syncedAt = Date.now()
  }

  static from(json: Record<string, any>) {
    const block = new Block({
      name: json['name'],
      type: json['type'],
    })

    block.id = json['id']
    block.name = json['name']
    block.type = json['type']
    block.layout = json['layout']
    block.percent = json['percent']
    block.ranking = json['ranking']
    block.createdAt = json['createdAt']
    block.updatedAt = json['updatedAt']
    block.syncedAt = json['syncedAt'] || 0
    block.deletedAt = json['deletedAt'] || 0

    return block
  }
}
