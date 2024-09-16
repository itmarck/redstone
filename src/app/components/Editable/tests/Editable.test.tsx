import { render, screen, cleanup } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import Editable from '..'

describe('<Editable />', () => {
  it('should render the component', () => {
    render(<Editable value="test" onChange={() => {}} />)
    const element = screen.getByText('test')
    expect(element.textContent).toBe('test')
    cleanup()
  })

  it('should update the text content', async () => {
    render(<Editable value="test" onChange={() => {}} />)
    const element = screen.getByText('test')
    await userEvent.click(element)
    await userEvent.type(element, 'ed')
    expect(element.textContent).toBe('tested')
  })
})
