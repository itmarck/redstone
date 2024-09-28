import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { DexieRepository, FirebaseCloud, Preferences } from './app/data'
import { routes } from './app/pages'
import { RepositoryProvider } from './app/store/repository'

const router = createBrowserRouter(routes)

const preferences = Preferences.instance
const cloud = preferences.cloud === 'firebase' ? new FirebaseCloud() : undefined
const repository = new DexieRepository(cloud)

function App() {
  return (
    <RepositoryProvider value={repository}>
      <RouterProvider router={router} />
    </RepositoryProvider>
  )
}

export default App
