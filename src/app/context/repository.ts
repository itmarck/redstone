import { createContext } from 'react'
import { Repository } from '../../core/repository'

export const RepositoryContext = createContext<Repository | null>(null)
export const RepositoryProvider = RepositoryContext.Provider
