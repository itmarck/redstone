import { createContext } from 'react'
import { Cluster } from '../../core/cluster'

export const StoreContext = createContext<Cluster | null>(null)
export const StoreProvider = StoreContext.Provider
