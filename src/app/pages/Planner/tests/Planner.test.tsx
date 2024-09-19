import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import Planner from '..'
import { Action, Block } from '../../../../core'
import { MemoryRepository } from '../../../data/memory'
import { RepositoryProvider } from '../../../store/repository'

export class FactoryRepository {
  static count(count: number) {
    const repository = new MemoryRepository()

    for (let i = 0; i < count; i++) {
      repository.command(
        { action: Action.ADD },
        Block.from({
          id: `${i + 1}`,
          name: `test${i + 1}`,
        }),
      )
    }

    return repository
  }
}

describe('<Planner />', () => {
  it('should render the component', async () => {
    render(
      <RepositoryProvider value={FactoryRepository.count(2)}>
        <Planner />
      </RepositoryProvider>,
    )

    const elements = await screen.findAllByRole('listitem')
    expect(elements.length).to.be.equals(2)
  })

  it('should mark the block as done', async () => {
    render(
      <RepositoryProvider value={FactoryRepository.count(1)}>
        <Planner />
      </RepositoryProvider>,
    )

    const checkbox = await screen.findAllByRole('checkbox')
    if (checkbox) await userEvent.click(checkbox[0])

    const node = screen.getByRole('checkbox') as HTMLInputElement
    expect(node.checked).to.be.true
  })
})
