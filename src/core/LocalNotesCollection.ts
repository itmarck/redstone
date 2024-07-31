import Dexie, { EntityTable } from 'dexie'
import { Collection } from './collection'
import { Note } from './database'

const REDSTONE = 'redstone'

export class LocalNotesCollection extends Collection<Note> {
  dexie

  constructor() {
    super()

    this.dexie = new Dexie(REDSTONE) as Dexie & {
      notes: EntityTable<Note, 'uid'>
    }

    this.dexie.version(1).stores({
      notes: '++uid, name, content',
    })
  }

  async search() {
    const notes = await this.dexie.notes.where('uid').notEqual('').sortBy('uid')

    return notes || []
  }

  async find(uid: string) {
    typeof uid
    return undefined
  }

  async add(item: Note) {
    await this.dexie.notes.add(item)
  }

  async update(item: Note) {
    item.updatedAt = new Date()
    await this.dexie.notes.update(item.uid, item)
  }

  async remove(item: Note) {
    typeof item
  }
}
