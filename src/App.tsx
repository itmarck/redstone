import { StoreProvider } from './app/context/store'
import { DexieCluster } from './app/data'
import Home from './app/pages/Home'

const cluster = new DexieCluster()

function App() {
  return (
    <StoreProvider value={cluster}>
      <Home />
    </StoreProvider>
  )
}

export default App
