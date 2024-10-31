import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { DexieRepository, FirebaseCloud, Preferences } from './app/data'
import { routes } from './app/pages'
import { RepositoryProvider } from './app/store/repository'

const router = createBrowserRouter(routes)

const cloudInstances = {
  firebase: new FirebaseCloud(),
  mongodb: undefined,
  none: undefined,
}

const cloud = cloudInstances[Preferences.instance.cloud]
const repository = new DexieRepository(cloud)

function App() {
  return (
    <RepositoryProvider value={repository}>
      <RouterProvider router={router} />
    </RepositoryProvider>
  )
}

export default App
