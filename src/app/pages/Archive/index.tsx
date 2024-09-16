import { useLiveQuery } from 'dexie-react-hooks'
import { useNavigate } from 'react-router-dom'

import { Block, BlockType } from '../../../core'
import { useRepository } from '../../hooks'

function Notes() {
  const navigate = useNavigate()
  const repository = useRepository()
  const blocks = useLiveQuery(() =>
    repository.query({
      type: BlockType.NOTE,
    }),
  )

  function onBlockClick(event: React.MouseEvent<HTMLLIElement>) {
    const blockId = event.currentTarget.id

    navigate(`/notes/${blockId}`)
  }

  if (!blocks) {
    return null
  }

  return (
    <ul>
      {blocks.map((block: Block) => (
        <li key={block.id} id={block.id} onClick={onBlockClick}>
          [{block.type}] {block.name}
        </li>
      ))}
    </ul>
  )
}

export default Notes
