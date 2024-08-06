import { useLiveQuery } from 'dexie-react-hooks'
import { Block, BlockType } from '../../../core/block'
import NoteCreator from '../../components/NoteCreator'
import { useRepository } from '../../hooks'

import './Home.css'

function Home() {
  const repository = useRepository()
  const blocks = useLiveQuery(() =>
    repository.query({
      type: BlockType.TASK,
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
                [{block.type}] {block.name}
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
