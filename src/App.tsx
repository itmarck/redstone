import { useEffect, useState } from 'react'
import Home from './app/pages/Home'
import { LocalDatabase } from './core/database'

function App() {
  const [database, setDatabase] = useState<LocalDatabase>()

  useEffect(() => {
    setDatabase(new LocalDatabase())
  }, [])

  if (!database) {
    return <div>Loading...</div>
  }

  return <Home database={database} />
}

export default App
