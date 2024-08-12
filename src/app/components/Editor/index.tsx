import { useLiveQuery } from 'dexie-react-hooks'
import { useParams } from 'react-router-dom'

import { useRepository } from '../../hooks'

function Editor() {
  const { id } = useParams()
  const repository = useRepository()
  const block = useLiveQuery(() =>
    repository.query({
      blockId: id,
    }),
  )?.at(0)

  if (!block) {
    return null
  }

  return (
    <div>
      <h1>{block.name}</h1>
      Editor {block.id}
    </div>
  )
}

export default Editor
