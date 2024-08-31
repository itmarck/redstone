import { useLiveQuery } from 'dexie-react-hooks'
import { useParams } from 'react-router-dom'

import { Action, Entry } from '../../../core'
import Editable from '../../../ui/Editable'
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
        <h1>
          <Editable
            value={block.name}
            onChange={(value) => {
              block.name = value
              repository.command({ action: Action.UPDATE }, block)
            }}
          />
        </h1>
        <p style={{ fontSize: '0.8rem', color: '#999' }}>
          {new Date(block.createdAt).toDateString()}
        </p>
      </header>
      <section className="Editor">
        {entries?.map((entry) => (
          <Editable
            key={entry.id}
            className="Entry"
            value={entry.content}
            onChange={(value) => {
              repository.command(
                {
                  action: Action.UPDATE,
                  entry: { ...entry, content: value },
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
