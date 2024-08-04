import { useLiveQuery } from 'dexie-react-hooks'
import { Block } from '../../../core/block'
import NoteCreator from '../../components/NoteCreator'
import { useStore } from '../../hooks/store'

function Home() {
  const store = useStore()
  const blocks = useLiveQuery(() => store.query({}))

  return (
    <main>
      <NoteCreator />

      {blocks && (
        <ul>
          {blocks.map((block: Block) => (
            <li key={block.id} id={block.id}>
              {block.name} [{block.layout}]
              <span> ({new Date(block.updatedAt).toUTCString()}) </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default Home
