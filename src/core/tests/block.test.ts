import { describe, it } from 'vitest'

import { Block, BlockType } from '../block'

describe('Core: Block', () => {
  it('should create block instance', async ({ expect }) => {
    const block = new Block({ name: 'test' })

    expect(block.id).to.exist
    expect(block.name).to.be.equals('test')
  })

  it('should update the block properties', async ({ expect }) => {
    const block = new Block({ name: 'test' })

    block.name = 'tested'
    block.type = BlockType.TASK

    expect(block.name).to.be.equals('tested')
    expect(block.type).to.be.equals(BlockType.TASK)
  })
})
