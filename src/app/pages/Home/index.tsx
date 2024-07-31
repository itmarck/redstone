import { useLiveQuery } from 'dexie-react-hooks'
import { Database, Note } from '../../../core/database'
import NoteCreator from '../../components/NoteCreator'

function Home({ database }: { database: Database }) {
  const notes = useLiveQuery(() => database.notes.search())

  return (
    <main>
      <NoteCreator database={database} />

      {notes && (
        <ul>
          {notes.map((note: Note) => (
            <li key={note.uid} id={note.uid}>
              {note.name} - {note.content} ({note.updatedAt.toLocaleString()})
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default Home
