import { describe, it } from 'vitest'

import { createId } from '../id'

describe('Core: createId', () => {
  it('should create a random id', async ({ expect }) => {
    const id = createId()

    // Using the default length of 24
    expect(id).to.have.length(24)
  })
})
