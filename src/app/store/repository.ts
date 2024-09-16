import { createContext, useContext } from 'react'
import { Repository } from '../../core/repository'

export const RepositoryContext = createContext<Repository | null>(null)
export const RepositoryProvider = RepositoryContext.Provider

export function useRepository() {
  return useContext(RepositoryContext) as Repository
}
