import { useEffect, useState } from 'react'

export function useLiveQuery<T>(querier: () => T | Promise<T>) {
  const [data, setData] = useState<T>()

  useEffect(() => {
    async function update() {
      const response = querier()

      if (response instanceof Promise) {
        response.then(setData)
      } else {
        setData(response)
      }
    }

    document.addEventListener('memory', update)

    update()

    return () => {
      document.removeEventListener('memory', update)
    }
  }, [querier])

  return data
}
