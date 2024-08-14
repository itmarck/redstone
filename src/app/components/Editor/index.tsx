import { useLiveQuery } from 'dexie-react-hooks'
import { useParams } from 'react-router-dom'

import { Action, Entry } from '../../../core'
import { useRepository } from '../../hooks'

import './Editor.css'

function Editor() {
  const { id } = useParams()
  const repository = useRepository()
  const block = useLiveQuery(() => repository.query({ blockId: id }))?.at(0)
  const entries = useLiveQuery(() => repository.getEntries(id as string))

  if (!block) {
    return null
  }

  return (
    <div>
      <header style={{ padding: '1rem' }}>
        <h1>{block.name}</h1>
        <p style={{ fontSize: '0.8rem', color: '#999' }}>
          {new Date(block.updatedAt).toDateString()}
        </p>
      </header>
      <section className="Editor">
        {entries?.map((entry) => (
          <input
            key={entry.id}
            id={entry.id}
            className="Entry"
            defaultValue={entry.content}
            onChange={(event) => {
              repository.command(
                {
                  action: Action.UPDATE,
                  entry: { ...entry, content: event.target.value },
                },
                block,
              )
            }}
          />
        ))}
        <button
          className="Entry Entry--add"
          onClick={async () => {
            const newEntry = Entry.create({ blockId: id, content: '' })
            await repository.command(
              {
                action: Action.ADD,
                entry: newEntry,
              },
              block,
            )
            document.getElementById(newEntry.id)?.focus()
          }}
        >
          Add new entry
        </button>
      </section>
    </div>
  )
}

export default Editor
