import { createRxDatabase, RxDatabase } from 'rxdb'

import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'
import { Collection } from './collection'
import { Note } from './database'

export class LocalNotesCollection extends Collection<Note> {
  constructor() {
    super()
  }

  async search() {
    const rxdb = await getInstance()
    const items = await rxdb.notes.find().exec()
    const notes = items && items.map(Note.create)

    return notes || []
  }

  async find(uid: string) {
    typeof uid
    return undefined
  }

  async add(item: Note) {
    const rxdb = await getInstance()
    await rxdb.notes.insert({
      uid: item.uid,
      name: item.name,
      content: item.content,
    })
  }

  async update(item: Note) {
    typeof item
  }

  async remove(item: Note) {
    typeof item
  }
}

let promise: Promise<RxDatabase>

async function getInstance() {
  if (!promise) promise = create()
  return promise
}

async function create() {
  console.info('LocalNotesCollection: creating database...')
  const _database = await createRxDatabase({
    name: 'redstone',
    storage: getRxStorageDexie(),
  })
  console.info('LocalNotesCollection: database has been created')

  await _database.addCollections({
    notes: {
      schema: schema,
      methods: {
        sayHi() {
          return 'This is a method'
        },
      },
    },
  })
  console.info('LocalNotesCollection: notes collection has been created')
  console.info('LocalNotesCollection: database has been initialized')

  return _database
}

const schema = {
  version: 0,
  primaryKey: 'uid',
  type: 'object',
  properties: {
    uid: {
      type: 'string',
      maxLength: 24, // <- the primary key must have set maxLength
    },
    name: {
      type: 'string',
    },
    content: {
      type: 'string',
    },
  },
}
