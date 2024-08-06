import { useContext } from 'react'
import { Repository } from '../../core/repository'
import { RepositoryContext } from '../context/repository'

export function useRepository() {
  return useContext(RepositoryContext) as Repository
}
