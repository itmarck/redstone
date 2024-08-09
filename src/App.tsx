import { RepositoryProvider } from './app/context/repository'
import { DexieRepository } from './app/data'
import Home from './app/pages/Home'
import Layout from './ui/Layout'

const repository = new DexieRepository()

function App() {
  return (
    <RepositoryProvider value={repository}>
      <Layout>
        <Home />
      </Layout>
    </RepositoryProvider>
  )
}

export default App
