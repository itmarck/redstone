import { useLiveQuery } from 'dexie-react-hooks'
import { Block, BlockLayout } from '../../../core/block'
import NoteCreator from '../../components/NoteCreator'
import { useStore } from '../../hooks/store'

import './Home.css'

function Home() {
  const store = useStore()
  const blocks = useLiveQuery(() =>
    store.query({
      layout: BlockLayout.TASK,
      sortBy: 'createdAt',
    }),
  )

  return (
    <main>
      <NoteCreator />

      {blocks && (
        <ul className="List">
          {blocks.map((block: Block) => (
            <li key={block.id} id={block.id} className="Card List__item">
              <div className="Card__title">
                [{block.layout}] {block.name}
              </div>
              <div className="Card__subtitle">
                {new Date(block.updatedAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default Home
