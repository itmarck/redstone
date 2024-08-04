import { useContext } from 'react'
import { Cluster } from '../../core/cluster'
import { StoreContext } from '../context/store'

export function useStore() {
  return useContext(StoreContext) as Cluster
}
