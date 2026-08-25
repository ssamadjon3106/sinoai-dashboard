import { dataProvider } from '@/api'
import { useAsync } from './useAsync'

export function useWeeklyRecommendation(id: string | undefined, lang: string) {
  return useAsync(() => (id ? dataProvider.getWeeklyRecommendation(id, lang) : Promise.resolve(undefined)), [id, lang])
}
