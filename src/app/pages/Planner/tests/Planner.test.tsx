import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, it } from 'vitest'

import { Action, Block, BlockType } from '../../../../core'
import { MemoryRepository } from '../../../data/memory'
import { routes } from '../../../pages'
import { RepositoryProvider } from '../../../store/repository'

const router = createMemoryRouter(routes, { initialEntries: ['/'] })

export class FactoryRepository {
  static count(count: number) {
    const repository = new MemoryRepository()

    for (let i = 0; i < count; i++) {
      repository.command(
        { action: Action.ADD },
        Block.from({
          id: `${i + 1}`,
          name: `test${i + 1}`,
          type: BlockType.TASK,
        }),
      )
    }

    return repository
  }
}

describe('Page: Planner', () => {
  it('should add a task to the inbox', async ({ expect }) => {
    render(
      <RepositoryProvider value={FactoryRepository.count(2)}>
        <RouterProvider router={router} />
      </RepositoryProvider>,
    )

    const textbox = screen.getByPlaceholderText("What's on your mind?")
    await userEvent.type(textbox, 'new task')

    const button = screen.getByRole('button', { name: 'Send to inbox' })
    await userEvent.click(button)

    expect(await screen.findByText(/new task/i)).to.exist
  })
})
