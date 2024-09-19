import { cleanup } from '@testing-library/react'
import { beforeEach, vi } from 'vitest'

vi.mock('dexie-react-hooks')

beforeEach(() => {
  cleanup()
})
