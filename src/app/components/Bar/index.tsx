import { useLiveQuery } from 'dexie-react-hooks'

import { FirestoreBackup } from '../../data/firestore_backup'
import { useRepository } from '../../hooks'
import { Action } from '../../../core'

function Bar() {
  const repository = useRepository()
  const blocks = useLiveQuery(() => repository.query({}))
  const localBlocks = blocks?.filter((block) => !block.syncedAt)
  const count = localBlocks?.length || 0

  function onCloudSyncClick() {
    if (!localBlocks || !blocks) return

    new FirestoreBackup().pull().then((cloudBlocks) => {
      for (const cloudBlock of cloudBlocks) {
        const localBlock = blocks.find((item) => item.id === cloudBlock.id)

        if (localBlock && localBlock.updatedAt < cloudBlock.updatedAt) {
          repository.command({ action: Action.UPDATE }, cloudBlock)
        }
      }

      for (const block of localBlocks) {
        new FirestoreBackup().commit(block).then(() => {
          repository.command({ action: Action.UPDATE }, block)
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
      <span className="material-symbols-rounded">settings</span>
    </header>
  )
}

export default Bar
