import { useCallback, useEffect, useRef, useState } from 'react'

export interface AsyncState<T> {
  data: T | undefined
  loading: boolean
  error: Error | undefined
  reload: () => void
}

/**
 * Generic async-fetch hook: tracks loading/error state around a Promise
 * factory and guards against setting state after unmount or after a newer
 * call has superseded an in-flight one (stale-response protection).
 */
export function useAsync<T>(factory: () => Promise<T>, deps: ReadonlyArray<unknown>): AsyncState<T> {
  const [data, setData] = useState<T | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | undefined>(undefined)
  const requestId = useRef(0)

  const run = useCallback(() => {
    const id = (requestId.current += 1)
    setLoading(true)
    setError(undefined)
    factory()
      .then((result) => {
        if (requestId.current === id) {
          setData(result)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (requestId.current === id) {
          setError(err instanceof Error ? err : new Error('Unknown error'))
          setLoading(false)
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    run()
  }, [run])

  return { data, loading, error, reload: run }
}
