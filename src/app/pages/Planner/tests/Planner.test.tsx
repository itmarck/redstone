import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Planner from '..'

describe('<Planner />', () => {
  it('should render the component', () => {
    render(<Planner />)
    expect(true).toBe(true)
  })
})
