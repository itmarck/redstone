import { useEffect, useState } from 'react'
import { Database, Note } from '../../../core/database'
import NoteCreator from '../../components/NoteCreator'

function Home({ database }: { database: Database }) {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    database.notes.search().then(setNotes)
  }, [database])

  return (
    <main>
      <NoteCreator database={database} />

      {notes.map((note: any) => (
        <div key={note.uid}>{note.name}</div>
      ))}
    </main>
  )
}

export default Home
