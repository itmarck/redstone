import { v4 } from 'uuid'
import { Collection } from './collection'
import { FirebaseNotesCollection } from './FirebaseNotesCollection'
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
  createdAt: Date
  updatedAt: Date

  constructor(data: Pick<Note, 'name' | 'content'>) {
    this.uid = v4()
    this.name = data.name || ''
    this.content = data.content || ''
    this.createdAt = new Date()
    this.updatedAt = new Date()
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

export class FirebaseDatabase extends Database {
  notes

  constructor() {
    super()

    this.notes = new FirebaseNotesCollection()
  }

  async sync(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
