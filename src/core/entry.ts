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
  content: string

  constructor(entry: Partial<Entry>) {
    this.id = entry.id || createId()
    this.type = entry.type || EntryType.PARAGRAPH
    this.content = entry.content || ''
  }
}
