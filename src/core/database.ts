import { Collection } from './collection'
import { LocalNotesCollection } from './LocalNotesCollection'

export interface DatabaseOptions {
  backup: {
    live?: boolean
    path?: string
  }
}

export abstract class Database {
  abstract notes: Collection<Note>

  backup?: Database = undefined
  live: boolean = true

  constructor(options?: DatabaseOptions) {
    this.live = options?.backup.live || this.live
  }

  abstract sync(): Promise<void>
}

export class Note {
  uid: string
  name: string
  content: string

  constructor(uid: string, name: string, content: string) {
    this.uid = uid
    this.name = name
    this.content = content
  }

  static create(data: Record<string, any>) {
    return new Note(data.uid, data.name, data.content)
  }
}

export class LocalDatabase extends Database {
  notes

  constructor() {
    super()

    this.notes = new LocalNotesCollection()
  }

  async sync() {
    throw new Error('Method not implemented.')
  }
}
