import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

vi.mock('dexie-react-hooks')

afterEach(() => {
  cleanup()
})
