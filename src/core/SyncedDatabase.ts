import { Collection } from './collection'
import {
  Database,
  DatabaseOptions,
  FirebaseDatabase,
  LocalDatabase,
  Note,
} from './database'

export class SyncedDatabase extends Database {
  localDb = new LocalDatabase()
  remoteDb = new FirebaseDatabase()

  constructor(options?: DatabaseOptions) {
    super(options)
  }

  get notes(): Collection<Note> {
    return this.localDb.notes
  }

  sync(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
