import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { DexieRepository, FirebaseCloud, Preferences } from './app/data'
import { routes } from './app/pages'
import { RepositoryProvider } from './app/store/repository'

const router = createBrowserRouter(routes)
const cloud = getCloudInstance()
const repository = new DexieRepository(cloud)

function App() {
  return (
    <RepositoryProvider value={repository}>
      <RouterProvider router={router} />
    </RepositoryProvider>
  )
}

function getCloudInstance() {
  switch (Preferences.instance.cloud) {
    case 'firebase':
      return new FirebaseCloud()
    default:
      return
  }
}

export default App
