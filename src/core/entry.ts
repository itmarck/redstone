import { BlockId } from './block'
import { createId } from './id'

export type EntryId = string

export enum EntryType {
  PARAGRAPH = 'paragraph',
  HEADING = 'heading',
  CALLOUT = 'callout',
  TRANSACTION = 'transaction',
  AUTOMATION = 'automation',
}

export class Entry {
  id: EntryId
  type: EntryType
  blockId: BlockId
  content: string
  createdAt: number
  updatedAt: number

  constructor(entry: Partial<Entry>) {
    this.id = entry.id || createId()
    this.type = entry.type || EntryType.PARAGRAPH
    this.blockId = entry.blockId || ''
    this.content = entry.content || ''
    this.createdAt = entry.createdAt || Date.now()
    this.updatedAt = entry.updatedAt || Date.now()
  }

  static create({ blockId, content }: Partial<Entry>) {
    return new Entry({
      id: createId(),
      type: EntryType.PARAGRAPH,
      blockId: blockId,
      content: typeof content === 'string' ? content : 'This is a new entry',
    })
  }
}
