import { ChangeEvent, useState } from 'react'
import { v4 } from 'uuid'
import { Database, Note } from '../../../core/database'

function NoteCreator({ database }: { database: Database }) {
  const [title, setTitle] = useState('')

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  async function onClick() {
    await database.notes.add(new Note(v4(), title, ''))
  }

  return (
    <div>
      <input type="text" value={title} onChange={onChange} />
      <button onClick={onClick}>Add</button>
      <p>{title}</p>
    </div>
  )
}

export default NoteCreator
