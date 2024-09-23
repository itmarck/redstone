import { useLiveQuery } from 'dexie-react-hooks'

import { Action, Block, BlockType } from '../../../core'
import { useRepository } from '../../store/hooks'

import './Planner.css'

function Planner() {
  const repository = useRepository()
  const blocks = useLiveQuery(() =>
    repository.query({
      type: BlockType.TASK,
      sortBy: 'createdAt',
    }),
  )

  function onBlockCheck(block: Block) {
    block.percent = block.percent === 100 ? 0 : 100
    repository.command({ action: Action.UPDATE }, block)
  }

  return (
    <main>
      {blocks && (
        <ul className="List">
          {blocks.map((block: Block) => (
            <li
              key={block.id}
              id={block.id}
              className={`Card List__item ${
                block.percent === 100 ? 'Card--done' : ''
              }`}
            >
              <input
                className="Card__check"
                checked={block.percent === 100}
                type="checkbox"
                onChange={() => onBlockCheck(block)}
              />
              <div className="Card__body">
                <div className="Card__title">
                  [{block.ranking} {block.type}] {block.name}
                </div>
                <div className="Card__subtitle">
                  {parseElapsedTime(block.createdAt)}
                </div>
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

export default Planner
