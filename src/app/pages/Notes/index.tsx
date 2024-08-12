import { useLiveQuery } from 'dexie-react-hooks'
import { useRepository } from '../../hooks'
import { Block, BlockType } from '../../../core'

function Notes() {
  const repository = useRepository()
  const blocks = useLiveQuery(() =>
    repository.query({
      type: BlockType.NOTE,
    }),
  )

  if (!blocks) {
    return null
  }

  return (
    <ul>
      {blocks.map((block: Block) => (
        <li key={block.id} id={block.id}>
          [{block.type}] {block.name}
        </li>
      ))}
    </ul>
  )
}

export default Notes
