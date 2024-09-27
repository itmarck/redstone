import { describe, it } from 'vitest'

import { DexieRepository } from '../..'
import { Action, Block, BlockType } from '../../../../core'

describe('DexieRepository', () => {
  it('should add a block to the repository', async ({ expect }) => {
    const repository = new DexieRepository()
    const block = Block.from({ id: '1', name: 'test' })

    await repository.command({ action: Action.ADD }, block)

    const all = await repository.query({ blockId: '1' })
    expect(all).to.have.length(1)
    repository.clear()
  })

  it('should filter by type', async ({ expect }) => {
    const repository = new DexieRepository()

    await repository.command(
      { action: Action.ADD },
      Block.from({ id: '1', name: 'test1' }),
    )
    await repository.command(
      { action: Action.ADD },
      Block.from({ id: '2', name: 'test2', type: BlockType.TASK }),
    )

    const all = await repository.query({ type: BlockType.TASK })

    expect(all).to.have.length(1)
    repository.clear()
  })
})
