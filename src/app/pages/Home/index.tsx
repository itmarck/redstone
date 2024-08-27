import { useLiveQuery } from 'dexie-react-hooks'
import { Action } from '../../../core'
import { Block, BlockType } from '../../../core'
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

  function onBlockClick(event: React.MouseEvent<HTMLLIElement>) {
    const blockId = event.currentTarget.id
    const block = blocks?.find((block) => block.id === blockId)

    if (block) {
      block.type = BlockType.NOTE
      repository.command({ action: Action.UPDATE }, block)
    }
  }

  return (
    <main>
      {blocks && (
        <ul className="List">
          {blocks.map((block: Block) => (
            <li
              key={block.id}
              id={block.id}
              className="Card List__item"
              onClick={onBlockClick}
            >
              <div className="Card__title">
                [{block.ranking} {block.type}] {block.name}
              </div>
              <div className="Card__subtitle">
                {parseElapsedTime(block.updatedAt)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

function parseElapsedTime(time: number) {
  const elapsed = Date.now() - time
  const minutes = Math.floor(elapsed / 1000 / 60)
  const days = Math.floor(minutes / 60 / 24)

  if (minutes === 0) {
    return 'just now'
  }

  if (days > 0) {
    return `${days} days ago`
  }

  return `${minutes} min ago`
}

export default Home
