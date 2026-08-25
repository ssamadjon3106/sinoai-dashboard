import { dataProvider } from '@/api'
import { useAsync } from './useAsync'

export function useInsights(id: string | undefined, lang: string) {
  return useAsync(() => (id ? dataProvider.getInsights(id, lang) : Promise.resolve(undefined)), [id, lang])
}
