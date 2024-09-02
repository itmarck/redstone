import { createId } from './id'

export type BlockId = string

export enum BlockType {
  NONE = 'none',
  TASK = 'task',
  NOTE = 'note',
  AREA = 'area',
  ACCOUNT = 'account',
}

export enum BlockState {
  NONE = 'none',
  DONE = 'done',
}

export enum BlockLayout {
  NONE = 'none',
}

export class Block {
  id: BlockId
  name: string
  type: BlockType
  state: BlockState // TODO: Move to percent instead
  layout: BlockLayout
  percent: number
  ranking: number
  createdAt: number
  updatedAt: number
  syncedAt?: number // Move to only number with zero?
  deletedAt?: number

  constructor(block: Partial<Block>) {
    this.id = createId()
    this.name = block.name || ''
    this.type = block.type || BlockType.NONE
    this.state = BlockState.NONE
    this.layout = block.layout || BlockLayout.NONE
    this.percent = 0
    this.ranking = 0
    this.createdAt = Date.now()
    this.updatedAt = Date.now()
  }

  update() {
    this.updatedAt = Date.now()
    this.syncedAt = undefined
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
    block.state = json['state']
    block.layout = json['layout']
    block.percent = json['percent']
    block.ranking = json['ranking']
    block.createdAt = json['createdAt']
    block.updatedAt = json['updatedAt']
    block.syncedAt = json['syncedAt']
    block.deletedAt = json['deletedAt']

    return block
  }
}
