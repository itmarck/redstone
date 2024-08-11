import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RepositoryProvider } from './app/context/repository'
import { DexieRepository } from './app/data'
import { routes } from './app/pages'

const router = createBrowserRouter(routes)
const repository = new DexieRepository()

function App() {
  return (
    <RepositoryProvider value={repository}>
      <RouterProvider router={router} />
    </RepositoryProvider>
  )
}

export default App
