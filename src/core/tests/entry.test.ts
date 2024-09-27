import { describe, it } from 'vitest'

import { Entry } from '../entry'

describe('Core: Entry', () => {
  it('should create an entry instance', async ({ expect }) => {
    const entry = new Entry({ blockId: '1', content: 'test' })

    expect(entry.blockId).to.be.equals('1')
    expect(entry.content).to.be.equals('test')
  })
})
