import { ChangeEvent, useState } from 'react'
import { Database, Note } from '../../../core/database'

function NoteCreator({ database }: { database: Database }) {
  const [title, setTitle] = useState('')

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  async function onClick() {
    const note = new Note({ name: title, content: '' })
    await database.notes.add(note)
    setTitle('')
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
