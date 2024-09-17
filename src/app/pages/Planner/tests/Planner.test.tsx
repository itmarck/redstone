import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Planner from '..'
import { Action, Block } from '../../../../core'
import { MemoryRepository } from '../../../data/memory'
import { RepositoryProvider } from '../../../store/repository'

function createRepositoryWith(blocks: Block[]) {
  const repository = new MemoryRepository()

  blocks.forEach((block) => {
    repository.command({ action: Action.ADD }, block)
  })

  return repository
}

describe('<Planner />', () => {
  it('should render the component', async () => {
    const repository = createRepositoryWith([
      Block.from({ id: '1', name: 'test1' }),
      Block.from({ id: '2', name: 'test2' }),
    ])
    render(
      <RepositoryProvider value={repository}>
        <Planner />
      </RepositoryProvider>,
    )

    const elements = await screen.findAllByRole('listitem')
    expect(elements.length).to.be.equals(2)
  })
})
