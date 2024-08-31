import { useLiveQuery } from 'dexie-react-hooks'
import { Link } from 'react-router-dom'

import { Action } from '../../../core'
import { useRepository } from '../../hooks'

function Bar() {
  const repository = useRepository()
  const blocks = useLiveQuery(() => repository.query({}))
  const localBlocks = blocks?.filter((block) => !block.syncedAt)
  const count = localBlocks?.length || 0

  function onCloudSyncClick() {
    if (!localBlocks || !blocks) return

    repository.cloud?.pull().then((cloudBlocks) => {
      for (const cloudBlock of cloudBlocks) {
        const localBlock = blocks.find((item) => item.id === cloudBlock.id)

        if (!localBlock) {
          repository.command({ action: Action.ADD, noUpdate: true }, cloudBlock)
        }

        if (localBlock && localBlock.updatedAt < cloudBlock.updatedAt) {
          repository.command(
            { action: Action.UPDATE, noUpdate: true },
            cloudBlock,
          )
        }
      }

      for (const block of localBlocks) {
        repository.cloud?.commit(block).then(() => {
          repository.command({ action: Action.UPDATE, noUpdate: true }, block)
        })
      }
    })
  }

  return (
    <header className="Bar">
      <div className="Bar__status">
        {count ? `${count} changes to be synced` : 'Everything is up to date'}
      </div>
      <span className="material-symbols-rounded">undo</span>
      <span className="material-symbols-rounded">redo</span>

      <span className="material-symbols-rounded" onClick={onCloudSyncClick}>
        cloud_sync
      </span>

      <span className="material-symbols-rounded">wifi_tethering</span>

      <Link to="/settings" className="material-symbols-rounded">
        settings
      </Link>
    </header>
  )
}

export default Bar
