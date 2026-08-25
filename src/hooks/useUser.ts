import { dataProvider } from '@/api'
import { useAsync } from './useAsync'

export function useUser(id: string | undefined) {
  return useAsync(() => (id ? dataProvider.getUser(id) : Promise.resolve(undefined)), [id])
}
