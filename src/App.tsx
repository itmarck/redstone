import { useEffect, useState } from 'react'
import Home from './app/pages/Home'
import { Database } from './core/database'
import { SyncedDatabase } from './core/SyncedDatabase'

function App() {
  const [database, setDatabase] = useState<Database>()

  useEffect(() => {
    setDatabase(new SyncedDatabase())
  }, [])

  if (!database) {
    return <div>Loading...</div>
  }

  return <Home database={database} />
}

export default App
