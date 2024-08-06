import { RepositoryProvider } from './app/context/repository'
import { DexieRepository } from './app/data'
import Home from './app/pages/Home'

const repository = new DexieRepository()

function App() {
  return (
    <RepositoryProvider value={repository}>
      <Home />
    </RepositoryProvider>
  )
}

export default App
